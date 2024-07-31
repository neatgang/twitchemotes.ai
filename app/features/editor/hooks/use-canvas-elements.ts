import { fabric } from "fabric";
import { useEffect, useState } from "react";

interface useCanvasEventsProps {
    canvas: fabric.Canvas | null;
    setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({ canvas, setSelectedObjects }: useCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (e) => {
                console.log("selection:created", e);
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection;:updated", (e) => {
                console.log("selection:updated", e);
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection:cleared", (e) => {
                console.log("selection:cleared", e);
                setSelectedObjects([]);
            });
        }

        return () => {
            if (canvas) {
                canvas?.off("selection:created");
                canvas?.off("selection:updated");
                canvas?.off("selection:cleared");
            }
        };

    }, [canvas, setSelectedObjects]);
}