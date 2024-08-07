import { fabric } from "fabric"

import * as material from "material-colors"

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

export type ActiveTool = "select" | "shapes" | "text" | "images" | "draw" | "fill" | "stroke-color" | "stroke-width" | "font" | "opacity" | "filter" | "settings" | "ai" | "remove-bg" | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 1;
export const STROKE_DASH_ARRAY = []

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
    changeStrokeDashArray: (value: number[]) => void;
    changeStrokeColor: (value: string) => void;
    getActiveStrokeWidth: () => number;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeDashArray: () => number[];
    canvas: fabric.Canvas;
    selectedObjects: fabric.Object[];

}