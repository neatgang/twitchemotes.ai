"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useEditor } from "../hooks/use-editor"

import { fabric } from "fabric"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { Toolbar } from "./toolbar"
import { Footer } from "./footer"
import { ActiveTool, EditorHookProps, selectionDependentTools } from "../types"
import { ShapeSidebar } from "./shape-sidebar"
import { Emote, EmoteForSale } from "@prisma/client"
import { FillColorSidebar } from "./fill-color-sidebar"
import { StrokeColorSidebar } from "./stroke-color-sidebar"
import { StrokeWidthSidebar } from "./stroke-width-sidebar"
import { OpacitySidebar } from "./opacity-sidebar"
import { TextSidebar } from "./text-sidebar"
import { FontSidebar } from "./font-sidebar"
import { ImageSidebar } from "./image-sidebar"
import { EmoteSidebar } from "./emote-sidebar"
import { useUser } from "@clerk/nextjs"
import { EmoteGeneratorSidebar } from "./generate-sidebar"

interface EditorProps {
  userId: string;
  emotes: Emote[];
}

export const Editor = ({ userId, emotes }: EditorProps) => {
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

    setActiveTool(tool); 
  }, [activeTool])

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select")
    }
  }, [activeTool])

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection
  })

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(
      canvasRef.current, 
      {
        controlsAboveOverlay: true,
        preserveObjectStacking: true,
      }
    )

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    }) 

    return () => {
      canvas.dispose();
    }
  }, [init])

  return (
    <div className="flex flex-col">
      <Navbar 
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute h-[calc(100%-134px)] w-full top-[134px] flex"> 
        <Sidebar 
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <EmoteSidebar 
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
          emotes={emotes} // Pass emotes as props
        />
        <EmoteGeneratorSidebar 
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