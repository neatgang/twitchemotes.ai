import { 
  Circle, 
  MousePointer2, 
  Pencil, 
  Redo2, 
  Square, 
  StickyNote, 
  Type,
  Undo2,
  Trash2Icon,
  DownloadIcon,
  FrameIcon
} from "lucide-react";

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

import { ToolButton } from "./tool-button";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  deleteLayers?: () => void; // Correctly type deleteLayers as a function
  handleDownload?: () => void; 
  handleDownloadSvg?: () => void; 
  handleDownloadPng?: () => void; 
  handleSmartCrop: () => void;
};

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  deleteLayers = () => {}, // Provide a default no-op function
  handleDownload = () => {}, 
  handleDownloadSvg = () => {}, 
  handleDownloadPng = () => {}, 
  handleSmartCrop = () => {}, 
  ...props
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      {/* <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ 
            mode: CanvasMode.None
          })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Note,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Rectangle,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Ellipse,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({
            mode: CanvasMode.Pencil,
          })}
          isActive={
            canvasState.mode === CanvasMode.Pencil
          }
        />
      </div> */}
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
      <ToolButton
          label="Trash"
          icon={Trash2Icon}
          onClick={deleteLayers} // Use deleteLayers function
        />
      <ToolButton
          label="Download Png"
          icon={DownloadIcon}
          onClick={handleDownloadPng} // Use deleteLayers function
        />
      <ToolButton
          label="Download"
          icon={DownloadIcon}
          onClick={handleDownloadSvg} // Use deleteLayers function
        />
                <ToolButton
          label="Smart Crop"
          icon={FrameIcon} // Use CloudIcon for the new button
          onClick={handleSmartCrop} // Add the new button handler
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};
