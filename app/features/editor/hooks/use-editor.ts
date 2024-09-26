
import { useCallback, useState, useMemo } from "react"

import { fabric } from "fabric"
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, Editor, EditorHookProps, FILL_COLOR, FONT_FAMILY, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { createFilter, downloadFile, isTextType } from "../utils";
import { ITextOptions } from "fabric/fabric-impl";
import axios from "axios";

import toast from "react-hot-toast";
// import '../fabric-extensions';

const buildEditor = ({
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    selectedObjects,
    strokeDashArray,
    setStrokeDashArray,
    fontFamily,
    setFontFamily,
}: BuildEditorProps): Editor => {

    const generateSaveOptions = () => {
        const { width, height, left, top } = getWorkspace() as fabric.Rect;

        return {
            name: "Image",
            format: "png",
            quality: 1.0,
            width: width,
            height: height,
            left: left,
            top: top,
        }
    };

    const savePng = () => {
        const options = generateSaveOptions();

        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        const dataURL = canvas.toDataURL(options);

        downloadFile(dataURL, "png");
    }

    const saveEmote = async () => {
        if (!canvas) {
            toast.error('Canvas is not initialized');
            return;
        }

        try {
            // Create a temporary canvas
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width ?? 0;
            tempCanvas.height = canvas.height ?? 0;
            const tempContext = tempCanvas.getContext('2d');

            if (!tempContext) {
                throw new Error('Failed to get 2D context');
            }

            // Draw white background
            tempContext.fillStyle = 'white';
            tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // Draw each object on the temporary canvas
            const drawPromises = canvas.getObjects().map((obj) => {
                return new Promise<void>((resolve) => {
                    if (obj.type === 'image') {
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        const originalSrc = (obj as fabric.Image).getSrc();
                        img.src = `/api/proxy-image?url=${encodeURIComponent(originalSrc)}`;
                        img.onload = () => {
                            tempContext.drawImage(
                                img,
                                obj.left ?? 0,
                                obj.top ?? 0,
                                obj.width ?? 0,
                                obj.height ?? 0
                            );
                            resolve();
                        };
                        img.onerror = () => {
                            console.error(`Failed to load image: ${originalSrc}`);
                            resolve();
                        };
                    } else {
                        resolve();
                    }
                });
            });

            // Wait for all images to load
            await Promise.all(drawPromises);

            // Convert the temporary canvas to a data URL
            const dataURL = tempCanvas.toDataURL('image/png');

            // Send the dataURL to the server
            const response = await axios.post('/api/saveemote', {
                userId: 'user-id', // Replace with actual user ID
                imageUrl: dataURL
            });

            if (response.status !== 200) {
                throw new Error('Failed to save emote');
            }

            toast.success('Emote saved successfully');
        } catch (error) {
            console.error('Error saving emote:', error);
            toast.error('Failed to save emote');
        }
    };

    const getWorkspace = () => {
        return canvas
            .getObjects()
            .find((object) => object.name === "clip")
    }
    const center = (object: fabric.Object) => {
        const workspace = getWorkspace()
        const center = workspace?.getCenterPoint();

        if (!center) {
            return;
        }

        // @ts-ignore
        canvas._centerObject(object, center)
    };

    const addToCanvas = (object: fabric.Object) => {
        console.log("Adding object to canvas", object);
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
        canvas.renderAll();
        console.log("Object added to canvas");
    };

    const getActiveImageUrl = (): string => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "image") {
            return (activeObject as fabric.Image).getSrc();
        }
        throw new Error("No active image selected");
    };

    const updateImage = (url: string) => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "image") {
            fabric.Image.fromURL(url, (newImage) => {
                canvas.remove(activeObject);
                canvas.add(newImage);
                canvas.setActiveObject(newImage);
                canvas.renderAll();
            }, { crossOrigin: 'anonymous' });
        } else {
            throw new Error("No active image selected");
        }
    };

    function shakeObject(object: fabric.Object, canvas: fabric.Canvas) {
        const duration = 500; // Duration of the animation in milliseconds
        const frequency = 10; // How many shakes within the duration
        const amplitude = 5; // How far to shake (in pixels)
    
        for (let i = 0; i < frequency; i++) {
            const direction = i % 2 === 0 ? 1 : -1; // Alternate direction
            const animationOptions = {
                left: object.left! + direction * amplitude,
                easing: fabric.util.ease.easeInOutQuad,
            };
    
            // Animate back and forth
            object.animate('left', object.left! + direction * amplitude, {
                duration: duration / frequency,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: i === frequency - 1 ? () => {
                    // Final callback to reset position
                    object.set({ left: object.left });
                    canvas.renderAll();
                } : undefined,
                easing: fabric.util.ease.easeInOutQuad,
            });
        }
    }
    
    // Example usage within your editor logic
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
        shakeObject(activeObject, canvas);
    }

    const inpaint = async (prompt: string, maskUrl: string) => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "image") {
            const imageObject = activeObject as fabric.Image;
            const imageUrl = imageObject.getSrc();

            try {
                const response = await axios.post('/api/inpaint', {
                    prompt,
                    image_url: imageUrl,
                    mask_url: maskUrl,
                });

                if (response.status !== 200) {
                    throw new Error('Failed to inpaint image');
                }

                const newImageUrl = response.data.image.url;

                fabric.Image.fromURL(newImageUrl, (newImage) => {
                    canvas.remove(imageObject);
                    addToCanvas(newImage);
                    canvas.renderAll();
                }, { crossOrigin: 'anonymous' });

            } catch (error) {
                console.error('Error inpainting image:', error);
                toast.error('Failed to inpaint image');
            }
        } else {
            toast.error('No image selected for inpainting');
        }
    };

    const generateMaskUrl = () => {
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.getWidth();
        maskCanvas.height = canvas.getHeight();
        const maskCtx = maskCanvas.getContext('2d');

        if (maskCtx) {
            canvas.getObjects('path').forEach((path) => {
                path.render(maskCtx);
            });
        }

        return maskCanvas.toDataURL('image/png');
    };

    const startDrawingMask = () => {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = 'black';
        canvas.freeDrawingBrush.width = 10;
    };

    const clearMask = () => {
        const paths = canvas.getObjects('path');
        paths.forEach((path) => canvas.remove(path));
        canvas.renderAll();
    };

    const removeBackground = async () => {
        console.log("removeBackground called");
        const objects = canvas.getActiveObjects();
        const promises = objects.map(async (object) => {
            if (object.type === "image") {
                const imageObject = object as fabric.Image;
                const imageUrl = imageObject.getSrc();

                try {
                    const response = await axios.post('/api/fal/birefnet-bg-remove', {
                        image: imageUrl
                    });

                    if (response.status !== 200) {
                        throw new Error('Failed to remove background');
                    }

                    const newImageUrl = response.data.image.url;

                    return new Promise<void>((resolve) => {
                        fabric.Image.fromURL(newImageUrl, (newImage) => {
                            console.log("New image loaded", newImage);
                            if (!newImage || typeof newImage.width === 'undefined' || typeof newImage.height === 'undefined') {
                                console.error('Image not fully loaded or missing dimensions');
                                resolve();
                                return;
                            }

                            // Set crossOrigin attribute for the new image
                            newImage.set({
                                crossOrigin: 'anonymous',
                                // Preserve the original image's position and scale
                                left: imageObject.left,
                                top: imageObject.top,
                                scaleX: imageObject.scaleX,
                                scaleY: imageObject.scaleY,
                            });

                            canvas.remove(imageObject);
                            canvas.add(newImage);
                            canvas.setActiveObject(newImage);
                            canvas.renderAll();
                            console.log("Canvas updated");
                            resolve();
                        });
                    });
                } catch (error) {
                    console.error('Error removing background:', error);
                }
            }
        });

        await Promise.all(promises);
        console.log("All background removals completed");
    };

    const downloadImage = async () => {
        // Get the workspace dimensions
        const workspace = getWorkspace() as fabric.Rect;
        const width = workspace?.width ?? canvas.getWidth();
        const height = workspace?.height ?? canvas.getHeight();
        const left = workspace?.left ?? 0;
        const top = workspace?.top ?? 0;

        // Create a temporary canvas with the workspace dimensions
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempContext = tempCanvas.getContext('2d');

        if (!tempContext) {
            console.error('Failed to get 2D context');
            return;
        }

        // Draw background
        tempContext.fillStyle = 'white';
        tempContext.fillRect(0, 0, width, height);

        // Function to load an image and draw it on the canvas
        const drawImageOnCanvas = async (imgObject: fabric.Image) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    tempContext.drawImage(
                        img,
                        (imgObject.left ?? 0) - left,
                        (imgObject.top ?? 0) - top,
                        (imgObject.width ?? 0) * (imgObject.scaleX ?? 1),
                        (imgObject.height ?? 0) * (imgObject.scaleY ?? 1)
                    );
                    resolve();
                };
                img.onerror = reject;
                // Use the proxy route to fetch the image
                const originalSrc = imgObject.getSrc();
                img.src = `/api/proxy-image?url=${encodeURIComponent(originalSrc)}`;
            });
        };

        // Draw all objects on the canvas
        const drawPromises = canvas.getObjects().map(async (obj) => {
            if (obj.type === 'image') {
                await drawImageOnCanvas(obj as fabric.Image);
            }
            // Add handling for other object types if needed
        });

        try {
            await Promise.all(drawPromises);

            // Convert the temporary canvas to a data URL
            const dataURL = tempCanvas.toDataURL('image/png');

            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error creating image:', error);
        }
    };

    return {

        enableDrawingMode: () => {
            canvas.discardActiveObject()
            canvas.renderAll()
            canvas.isDrawingMode = true
            canvas.freeDrawingBrush.width = strokeWidth
            canvas.freeDrawingBrush.color = strokeColor
        },

        disableDrawingMode: () => {
            canvas.isDrawingMode = false
        },

        removeBackground,
        downloadImage,
        saveEmote,

        changeImageFilter: (value: string) => {
            const objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if (object.type === "image") {
                    const imageObject = object as fabric.Image;

                    const effect = createFilter(value);

                    imageObject.filters = effect ? [effect] : [];
                    imageObject.applyFilters();
                    canvas.renderAll();
                }
            });
        },

        addEmote: (value: string) => {
            fabric.Image.fromURL(value, (image) => {
                const workspace = getWorkspace()

                image.scaleToWidth(workspace?.width || 0)
                image.scaleToHeight(workspace?.height || 0)

                addToCanvas(image)
            },
                {
                    crossOrigin: "anonymous"
                }
            )
        },

        addGeneratedEmote: (value: string) => {
            fabric.Image.fromURL(value, (image) => {
                const workspace = getWorkspace()

                image.scaleToWidth(workspace?.width || 0)
                image.scaleToHeight(workspace?.height || 0)

                addToCanvas(image)
            },
            )
        },

        addImage: (value: string) => {
            fabric.Image.fromURL(value, (image) => {
                // Ensure image is loaded and has defined dimensions before proceeding
                if (!image || typeof image.width === 'undefined' || typeof image.height === 'undefined') {
                    console.error('Image not fully loaded or missing dimensions');
                    return;
                }

                const workspace = getWorkspace();

                // Use optional chaining with fallback values for canvas dimensions
                const canvasWidth = canvas?.width || 0;
                const canvasHeight = canvas?.height || 0;

                // Determine the scale factors based on the image and canvas (or workspace) dimensions
                const scaleX = workspace?.width ? workspace.width / image.width : 1;
                const scaleY = workspace?.height ? workspace.height / image.height : 1;
                const scaleToFit = Math.min(scaleX, scaleY);

                // Check if the image is smaller than the canvas and adjust scaling to avoid blurriness
                if (image.width < canvasWidth && image.height < canvasHeight) {
                    image.scale(scaleToFit); // Adjust scale to maintain quality
                } else {
                    // For larger images, you might want to scale down or adjust as needed
                    image.scaleToWidth(workspace?.width || 0);
                    image.scaleToHeight(workspace?.height || 0);
                }

            addToCanvas(image);
            });
        },

        delete: () => {
            canvas.getActiveObjects().forEach((object) => canvas.remove(object))
            canvas.discardActiveObject()
            canvas.renderAll()
        },

        addText: (value: string, options?: ITextOptions) => {
            const object = new fabric.Textbox(value, {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options
            })

            addToCanvas(object)
        },

        getActiveOpacity: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return 1
            }

            const value = selectedObject.get("opacity") || 1

            return value
        },

        changeOpacity: (value: number) => {
            canvas.getActiveObjects().forEach((object) => {
                object.set({ opacity: value })
            })

            canvas.renderAll()
        },

        bringForward: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.bringForward(object)
            })

            canvas.renderAll()

            const workspace = getWorkspace()
            workspace?.sendToBack()
        },

        sendBackwards: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.sendBackwards(object)
            })

            canvas.renderAll()

            const workspace = getWorkspace()
            workspace?.sendToBack()
        },

        changeFontFamily: (value: string) => {
            setFontFamily(value)
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    object.set({

                        // @ts-ignore
                        fontFamily: value
                    })
                }
            })
            canvas.renderAll()
        },

        changeFillColor: (value: string) => {
            setFillColor(value)
            canvas.getActiveObjects().forEach((object) => {
                object.set({
                    fill: value
                })
            })
            canvas.renderAll()
        },

        changeStrokeColor: (value: string) => {
            setStrokeColor(value)
            canvas.getActiveObjects().forEach((object) => {
                // text types dont have stroke
                if (isTextType(object.type)) {
                    object.set({
                        fill: value
                    })
                    return;
                }

                object.set({
                    stroke: value
                })
            })
            canvas.freeDrawingBrush.color = value
            canvas.renderAll()
        },

        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value)
            canvas.getActiveObjects().forEach((object) => {
                object.set({
                    strokeWidth: value
                })
            })
            canvas.freeDrawingBrush.width = value
            canvas.renderAll() // Add this line to re-render the canvas
        },

        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value)
            canvas.getActiveObjects().forEach((object) => {
                object.set({
                    strokeDashArray: value
                })
            })
            canvas.renderAll() // Add this line to re-render the canvas
        },

        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object)
        },

        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 10,
                ry: 10,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object)
        },

        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object)
        },

        addTriangle: () => {
            const object = new fabric.Triangle({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object)
        },

        addInverseTriangle: () => {

            const HEIGHT = 100;
            const WIDTH = 100;

            const object = new fabric.Polygon(
                [
                    { x: 0, y: 0 },
                    { x: WIDTH, y: 0 },
                    { x: WIDTH / 2, y: HEIGHT }
                ],
                {
                    ...RECTANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            )

            addToCanvas(object)
        },

        addDiamond: () => {

            const HEIGHT = 100;
            const WIDTH = 100;

            const object = new fabric.Polygon(
                [
                    { x: WIDTH / 2, y: 0 },
                    { x: WIDTH, y: HEIGHT / 2 },
                    { x: WIDTH / 2, y: HEIGHT },
                    { x: 0, y: HEIGHT / 2 }
                ],
                {
                    ...RECTANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            )

            addToCanvas(object)
        },

        canvas,
        inpaint,
        generateMaskUrl,
        getActiveImageUrl,
        updateImage,
        startDrawingMask,
        clearMask,

        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return fillColor
            }

            const value = selectedObject.get("fill") || fillColor

            // currently gradients and patterns are not supported
            return value as string;
        },

        getActiveFontFamily: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return fontFamily
            }

            // @ts-ignore
            const value = selectedObject.get("fontFamily") || fontFamily

            // currently gradients and patterns are not supported
            return value
        },

        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return strokeColor
            }

            const value = selectedObject.get("stroke") || strokeColor

            // currently gradients and patterns are not supported
            return value
        },

        getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return strokeWidth;
            }

            const value = selectedObject.get("strokeWidth") || strokeWidth

            // currently gradients and patterns are not supported
            return value
        },

        getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0]

            if (!selectedObject) {
                return strokeDashArray;
            }

            const value = selectedObject.get("strokeDashArray") || strokeDashArray

            // currently gradients and patterns are not supported
            return value
        },

        selectedObjects,
    }
}

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
    const [fontFamily, setFontFamily] = useState(FONT_FAMILY)
    const [fillColor, setFillColor] = useState(FILL_COLOR)
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY)

    useAutoResize({
        canvas,
        container
    })

    useCanvasEvents({
        canvas,
        setSelectedObjects,
        clearSelectionCallback
    })

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                selectedObjects,
                strokeDashArray,
                setStrokeDashArray,
                fontFamily,
                setFontFamily,
            });
        }

        return undefined;
    }, [
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects,
        strokeDashArray,
        fontFamily,
    ]);

    const init = useCallback(({
        initialCanvas,
        initialContainer
    }: {
        initialCanvas: fabric.Canvas
        initialContainer: HTMLDivElement

    }) => {

        fabric.Object.prototype.set({
            cornerColor: "#fff",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6"
        })

        const initialWorkspace = new fabric.Rect({
            width: 500,
            height: 500,
            fill: 'white',
            name: 'clip',
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5,
            }),
        })

        initialCanvas.setWidth(
            initialContainer.offsetWidth
        )
        initialCanvas.setHeight(
            initialContainer.offsetHeight
        )
        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace

        setCanvas(initialCanvas)
        setContainer(initialContainer)

        // const test = new fabric.Rect({
        //     height: 100,
        //     width: 100,
        //     fill: "black"
        // })

        // initialCanvas.add(test);
        // initialCanvas.centerObject(test)

    }, [])

    return { editor, init }
};
