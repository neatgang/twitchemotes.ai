"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useEditor } from "../hooks/use-editor"

import { fabric } from "fabric"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { Toolbar } from "./toolbar"
import { Footer } from "./footer"
import { ActiveTool } from "../types"
import { ShapeSidebar } from "./shape-sidebar"
import { ImageSidebar } from "./image-sidebar"
import { Emote, EmoteForSale } from "@prisma/client"

interface EditorProps {
    emotes: (Emote & { emoteForSale?: EmoteForSale | null })[];
  }

export const Editor = ({ emotes }: EditorProps) => {

    const [activeTool, setActiveTool] = useState<ActiveTool>("select")

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {

        if (tool === activeTool) {
            return setActiveTool("select")
        }

        if (tool === "draw") {
            // Enable Draw Mode
        }

        if (activeTool === "draw") {
            // Disable draw mode
        }

        if (tool === "draw") {
            // Enable Draw Mode
        }

        if (activeTool === "draw") {
            // Disable draw mode
        }

        setActiveTool(tool); 
    }, [activeTool])


    const { init, editor } = useEditor()

    const canvasRef = useRef(null)

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const canvas = new fabric.Canvas(
            canvasRef.current, 
            {
                controlsAboveOverlay: true,
                preserveObjectStacking:true,
        })

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        }) 

        return () => {
            canvas.dispose();
        }
    }, [init])

    const handleImageUpload = useCallback((image: string) => {
        if (editor) {
            fabric.Image.fromURL(image, (img) => {
                editor.canvas.add(img);
                editor.canvas.renderAll();
            });
        }
    }, [editor]);

  return (
    <div className="h-full flex flex-col">
        <Navbar 
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
        />
        <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex"> 
            <Sidebar 
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <ImageSidebar 
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
                editor={editor}
                onImageUpload={handleImageUpload}
                emotes={emotes}
                // emotesForSale={emotesForSale}
            />
            <ShapeSidebar 
                editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                <Toolbar 
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                    key={JSON.stringify(
                        editor?.canvas.getActiveObject()
                    )}
                />
                <div className="flex-1 h-[calc(100%-56px)] bg-muted" ref={containerRef}>
                    <canvas ref={canvasRef} />
                </div>
                <Footer />
            </main>
        </div>
    </div>
  )
}