import { fabric } from "fabric"

export type ActiveTool = "select" | "shapes" | "text" | "images" | "draw" | "fill" | "stroke-color" | "stroke-width" | "font" | "opacity" | "filter" | "settings" | "ai" | "remove-bg" | "templates";

export const FILL_COLOR = "rbga(0,0,0,1)";
export const STROKE_COLOR = "rbga(0,0,0,1)";
export const STROKE_WIDTH = 2

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

export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    setFillColor: (color: string) => void;
    strokeColor: string;
    setStrokeColor: (color: string) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
}

export interface Editor {
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    changeFillColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeColor: (value: string) => void;
    strokeColor: string;
    strokeWidth: number;
    fillColor: string;
    canvas: fabric.Canvas;
}