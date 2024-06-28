"use client"

import { OrgSidebar } from "@/components/canvas/org-sidebar";
import { BoardSidebar } from "@/components/canvas/sidebar";
import { ImageProvider } from "@/providers/canvas/ImageContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
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
