'use client'

import { Button } from "@/components/ui/button"
import { Home, Layers, FileText, Settings } from "lucide-react"

interface SidebarProps {
  // onStartTraining: () => void;
}

export default function Sidebar({ }: SidebarProps) {
  return (
    <div className="w-16 bg-[#242424] p-4 flex flex-col items-center">
      <nav className="space-y-6">
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <Home className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <Layers className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <FileText className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10">
          <Settings className="w-6 h-6" />
        </Button>
      </nav>
    </div>
  )
}