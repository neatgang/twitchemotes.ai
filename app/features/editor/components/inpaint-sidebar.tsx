import React, { useState } from 'react';
import { ActiveTool, Editor } from '../types'; // Import ActiveTool
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface InpaintSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool; // Change string to ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void; // Change string to ActiveTool
}

export const InpaintSidebar: React.FC<InpaintSidebarProps> = ({ editor, activeTool, onChangeActiveTool }) => {
    const [prompt, setPrompt] = useState('');

    const handleInpaint = () => {
        if (editor && prompt) {
            const maskUrl = editor.generateMaskUrl(); // Generate mask URL
            editor.inpaint(prompt, maskUrl); // Pass both prompt and maskUrl
        }
    };

    const handleDrawMask = () => {
        if (editor) {
            editor.startDrawingMask();
        }
    };

    const handleClearMask = () => {
        if (editor) {
            editor.clearMask();
        }
    };

    const onClose = () => {
        onChangeActiveTool("select");
    };

    if (activeTool !== 'inpaint') return null;

    return (
        <aside className={cn("bg-white relative border-r z-[40] w-[300px] h-full flex flex-col", activeTool === "inpaint" ? "visible" : "hidden")}>
            <ToolSidebarHeader title="Inpaint" description="Inpaint selected area" />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    <Input
                        type="text"
                        placeholder="Enter inpainting prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mb-4"
                    />
                    <Button onClick={handleInpaint} variant="default" className="w-full">Inpaint</Button>
                    <Button onClick={handleDrawMask} variant="default" className="w-full">Draw Mask</Button>
                    <Button onClick={handleClearMask} variant="default" className="w-full">Clear Mask</Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};