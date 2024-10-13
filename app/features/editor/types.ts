import { Emote } from "@prisma/client";
import { fabric } from "fabric"
import { ITextOptions } from "fabric/fabric-impl";

import * as material from "material-colors"

export const fonts = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]


export const filters = [
    "polaroid",
    "sepia",
    "kodachrome",
    "contrast",
    "brightness",
    "brownie",
    "vintage",
    "technicolor",
    "pixelate",
    "invert",
    "blur",
    "sharpen",
    "emboss",
    "removecolor",
    "blacknwhite",
    "vibrance",
    "blendcolor",
    "huerotate",
    "resize",
    "gamma",
    "none",
]

export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "stroke-color",
    "stroke-width",
    "remove-bg"
]

export const colors = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.blueGrey["500"],
    "transparent",
]

export type ActiveTool = 
    | "select" 
    | "shape" 
    | "text" 
    | "image" 
    | "emote" 
    | "generate" 
    | "filter" 
    | "draw" 
    | "inpaint"
    | "fill"
    | "stroke-color"
    | "stroke-width"
    | "font"
    | "opacity"
    | "remove-bg"
    | "emotes"
    | "emote-generator"
    | "images"
    | "shapes"
    | "settings"


export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = []
export const FONT_FAMILY = "Arial"
export const FONT_SIZE = 32

export const CIRCLE_OPTIONS = {
    radius: 50,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const RECTANGLE_OPTIONS = {
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const TRIANGLE_OPTIONS = {
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const TEXT_OPTIONS = {
    type: "textbox",
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
}

export interface EditorHookProps {
    clearSelectionCallback?: () => void;
}

export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    setFillColor: (color: string) => void;
    strokeColor: string;
    setStrokeColor: (color: string) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
    selectedObjects: fabric.Object[];
    strokeDashArray: number[];
    setStrokeDashArray: (value: number[]) => void;
    fontFamily: string;
    setFontFamily: (value: string) => void;
    // shakeAnimation: (object: fabric.Object) => void;
    
}

export interface Editor {
    getActiveImageUrl: () => string;
    updateImage: (url: string) => void;
    generateMaskUrl: () => string;
    inpaint: (prompt: string, maskUrl: string) => void;
    changeImageFilter: (value: string) => void;
    addGeneratedEmote: (value: string) => void;
    addEmote: (value: string) => void;
    addImage: (value: string) => void;
    delete: () => void;
    addText: (value: string, options?: ITextOptions) => void;
    getActiveOpacity: () => number;
    changeOpacity: (value: number) => void;
    bringForward: () => void;
    sendBackwards: () => void;
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    changeFillColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeDashArray: (value: number[]) => void;
    changeStrokeColor: (value: string) => void;
    getActiveStrokeWidth: () => number;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeDashArray: () => number[];
    canvas: fabric.Canvas;
    selectedObjects: fabric.Object[];
    changeFontFamily: (value: string) => void;
    getActiveFontFamily: () => string;
    removeBackground: () => void;
    enableDrawingMode: () => void;
    disableDrawingMode: () => void;
    downloadImage: () => void;
    // shakeAnimation: (object: fabric.Object) => void;
    saveEmote: (prompt: string, userId: string) => Promise<Emote | undefined>;
    startDrawingMask: () => void; // Add this method
    clearMask: () => void; // Add this method
    
}

export const generation = {
    models: [
        {
            name: "DALL-E 3",
            apiRoute: "/api/models/dalle",
            description: "Generate emotes using DALL-E 3 model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of {subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of {subject}.",
                },
                {
                    name: "cartoon",
                    prompt: "Create a cartoon style emote of {subject}.",
                },
            ],
        },
        // {
        //     name: "stableDiffusion",
        //     apiRoute: "/api/models/stable-diffusion",
        //     description: "Generate emotes using Stable Diffusion model.",
        //     themes: [
        //         {
        //             name: "chibi",
        //             prompt: "Create a chibi style emote of {subject}.",
        //         },
        //         {
        //             name: "pixel",
        //             prompt: "Create a pixel art style emote of {subject}.",
        //         },
        //         {
        //             name: "realistic",
        //             prompt: "Create a realistic style emote of {subject}.",
        //         },
        //     ],
        // },
        {
            name: "FLUX.1 [dev]",
            apiRoute: "/api/models/fal/fluxdev",
            description: "Generate emotes using the Flux-Dev model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of ${subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of ${subject}.",
                },
                {
                    name: "realistic",
                    prompt: "Create a realistic style emote of ${subject}.",
                },
            ],
        },
        {
            name: "FLUX.1 [schnell]",
            apiRoute: "/api/models/fal/fluxschnell",
            description: "Generate emotes using the Flux-Schnell model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of ${subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of ${subject}.",
                },
                {
                    name: "realistic",
                    prompt: "Create a realistic style emote of ${subject}.",
                },
            ],
        },
        {
            name: "FLUX 1 [pro]",
            apiRoute: "/api/models/fal/fluxpro",
            description: "Generate emotes using the Flux-Pro model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of ${subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of ${subject}.",
                },
                {
                    name: "realistic",
                    prompt: "Create a realistic style emote of ${subject}.",
                },
            ],
        },
        {
            name: "FLUX 1.1 [pro]",
            apiRoute: "/api/models/fal/fluxpro11",
            description: "Generate emotes using the Flux-Pro 1.1 model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of ${subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of ${subject}.",
                },
                {
                    name: "realistic",
                    prompt: "Create a realistic style emote of ${subject}.",
                },
            ],
        },
        {
            name: "FLUX.1 [dev] - Image to Image",
            apiRoute: "/api/models/fal/fluxdev/imagetoimage",
            description: "Generate emotes using the Flux-Schnell model.",
            themes: [
                {
                    name: "chibi",
                    prompt: "Create a chibi style emote of ${subject}.",
                },
                {
                    name: "pixel",
                    prompt: "Create a pixel art style emote of ${subject}.",
                },
                {
                    name: "realistic",
                    prompt: "Create a realistic style emote of ${subject}.",
                },
            ],
        },
        {
            name: "Aura Flow",
            apiRoute: "/api/models/fal/auraflow",
            description: "Generate high-quality images using the Aura Flow model.",
            themes: [
                {
                    name: "portrait",
                    prompt: "Create a detailed portrait of ${subject}.",
                },
                {
                    name: "landscape",
                    prompt: "Generate a beautiful landscape featuring ${subject}.",
                },
                {
                    name: "abstract",
                    prompt: "Create an abstract representation of ${subject}.",
                },
            ],
        },
    ],
};
