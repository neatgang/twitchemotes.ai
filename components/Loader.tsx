import { Loader2, Loader2Icon } from "lucide-react";
import Image from "next/image";

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center"> 
            <div className="relative animate-spin flex items-center justify-center mt-4"> 
                <Loader2Icon />
            </div>
            <p>
                {/* Generating... */}
            </p>
        </div>
    )
};
