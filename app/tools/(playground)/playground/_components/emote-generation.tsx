import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"

import { Download, Loader, Paintbrush2, SaveAll } from "lucide-react"
import Image from "next/image"

export function EmoteGeneration({ photos, removeBackground, isRemovingBackground, handleSave, form, userId }: any) {
    return (
        <div>
            {photos.map((src: any, index: any) => (
                <Card key={src} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-square m-72">
                        <Image
                            fill
                            alt="Generated"
                            src={src}
                        />
                    </div>
                    <CardFooter className="p-2 flex flex-col gap-2">
                        <Button onClick={() => removeBackground(src, index)} disabled={isRemovingBackground} className="w-full flex">
                            {isRemovingBackground ? (
                                <Loader /> // Replace with your actual loading spinner component
                            ) : (
                                <>
                                    <Paintbrush2 className="h-4 w-4 mr-2" />
                                    Remove Background
                                </>
                            )}
                        </Button>
                        <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                        <Button onClick={() => handleSave(src, form.getValues().prompt, userId || '')} variant="secondary" className="w-full">
                            <SaveAll className="h-4 w-4 mr-2" />
                            Save
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}