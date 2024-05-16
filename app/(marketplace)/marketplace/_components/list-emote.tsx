
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export default function ListEmote() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold md:text-3xl">List an Emote</h1>
            <p className="text-gray-500 dark:text-gray-400">Fill out the form to list your emote on the marketplace.</p>
          </div>
        </div>
      </header>
      <Card>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emoteId">Emote ID</Label>
              <Input id="emoteId" placeholder="Enter a unique ID" type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" placeholder="Enter the image URL" type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="watermarkedUrl">Watermarked URL</Label>
              <Input id="watermarkedUrl" placeholder="Enter the watermarked URL (optional)" type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea id="prompt" placeholder="Enter the prompt used to generate the emote" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter the price (optional)" step="0.01" type="number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="style">Style</Label>
              <Input id="style" placeholder="Enter the style (optional)" type="text" />
            </div>
            <Button type="submit">List Emote</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}