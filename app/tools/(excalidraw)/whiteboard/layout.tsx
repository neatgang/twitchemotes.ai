"use client"

import { OrgSidebar } from "@/components/canvas/org-sidebar";
import { BoardSidebar } from "@/components/canvas/sidebar";
import { ImageProvider } from "@/providers/canvas/ImageContext";
import { Layer, CanvasState, Point, CanvasMode } from "@/types/canvas"; // Ensure CanvasState and other types are imported
import { useState } from "react";

// Define initial states if they are not imported
const initialCanvasState: CanvasState = {
  mode: CanvasMode.None,
  origin: { x: 0, y: 0 },
  current: { x: 0, y: 0 } // Ensure this matches the updated CanvasState type
};

const initialLayers: Layer[] = []; // Example value, update as needed

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>(initialCanvasState);
  const [layers, setLayers] = useState<Layer[]>(initialLayers);

  return (
    <ImageProvider>
      <main className="h-full flex">
        {/* <BoardSidebar /> */}
        <div className="flex-1 flex h-full">
          {/* <OrgSidebar /> */}
          <div className="flex-1 h-full">
            {children}
          </div>
        </div>
      </main>
    </ImageProvider>
  );
};

export default DashboardLayout;