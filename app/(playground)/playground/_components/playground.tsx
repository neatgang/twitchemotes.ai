

import { useState } from 'react'
import { EmoteGeneration } from './emote-generation'
import { Header } from './header'
import { MessageForm } from './message-form'
import { SettingsForm } from './settings-form'
import { Sidebar } from './sidebar'

export function Playground() {

    const [photos, setPhotos] = useState<string[]>([]);

    const removeBackground = (src: any, index: any) => {
        console.log(`Removing background from photo ${index + 1}: ${src}`)
    }

    const handleSave = (src: any, prompt: any, userId: any) => {
        console.log(`Saving photo ${src} with prompt ${prompt} for user ${userId}`)
    }

    const userId = "exampleUserId"

    return (
      <div className="grid w-full pl-[56px]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2">
          {/* <SettingsForm setPhotos={setPhotos} /> */}
            {/* <MessageForm /> */}
            {/* <EmoteGeneration
            photos={photos}
            removeBackground={removeBackground}
            isRemovingBackground={false}
            handleSave={handleSave}
            form={form}
            userId={userId}
        /> */}
          </main>
        </div>
      </div>
    )
}