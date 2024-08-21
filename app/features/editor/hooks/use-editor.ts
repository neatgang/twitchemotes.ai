import { useCallback, useState, useMemo } from "react"

import { fabric } from "fabric"
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, Editor, EditorHookProps, FILL_COLOR, FONT_FAMILY, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAY, STROKE_WIDTH, TEXT_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { createFilter, isTextType } from "../utils";
import { ITextOptions } from "fabric/fabric-impl";
import axios from "axios";

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
    setFontFamily
}: BuildEditorProps): Editor => {

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
        center(object)
        canvas.add(object)
        canvas.setActiveObject(object)
    }

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

    const inpaint = async (prompt: string, maskUrl: string) => {
        const objects = canvas.getActiveObjects();
        objects.forEach(async (object) => {
          if (object.type === "image") {
            const imageObject = object as fabric.Image;
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
                canvas.add(newImage);
                canvas.setActiveObject(newImage);
                canvas.renderAll();
              }, { crossOrigin: 'anonymous' });
    
            } catch (error) {
              console.error('Error inpainting image:', error);
            }
          }
        });
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

        removeBackground: async () => {
            const objects = canvas.getActiveObjects();
            objects.forEach(async (object) => {
                if (object.type === "image") {
                    const imageObject = object as fabric.Image;
                    const imageUrl = imageObject.getSrc();

                    try {
                        const response = await axios.post('/api/fal/birefnet-bg-remove', {
                            image: imageUrl
                        })

                        if (response.status !== 200) {
                            throw new Error('Failed to remove background');
                        }

                        const newImageUrl = response.data.image.url; // Accessing the correct property

                        fabric.Image.fromURL(newImageUrl, (newImage) => {
                            canvas.remove(imageObject);
                            canvas.add(newImage);
                            canvas.setActiveObject(newImage);
                            canvas.renderAll();
                        }, { crossOrigin: 'anonymous' });

                    } catch (error) {
                        console.error('Error removing background:', error);
                    }
                }
            });
        },

        saveImage: () => {
            // Ensure all images have crossOrigin set
            canvas.getObjects('image').forEach((object) => {
                const img = object as fabric.Image;
                if (img.getSrc().indexOf('crossOrigin') === -1) {
                    img.setSrc(img.getSrc(), () => { }, { crossOrigin: 'anonymous' });
                }
            });

            // Wait for images to load before saving
            setTimeout(() => {
                const dataURL = canvas.toDataURL({
                    format: 'png',
                    quality: 1.0
                });
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'canvas.png';
                link.click();
            }, 1000); // Adjust timeout as needed
        },

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
            }, {
                crossOrigin: "anonymous"
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

        selectedObjects
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
                setFontFamily
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
        fontFamily
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
