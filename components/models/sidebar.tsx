'use client'

import { Button } from "@/components/ui/button"
import { Home, Layers, FileText, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-16 bg-[#242424] p-4 flex flex-col items-center">
      {/* <div className="w-8 h-8 bg-blue-500 rounded-md mb-8"></div> */}
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