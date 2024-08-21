import { Button } from "@/components/ui/button"
import { InstagramIcon, TwitterIcon, XIcon } from "lucide-react"
import { BsDiscord } from "react-icons/bs"

export default function Footer() {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold">EmoteMaker.ai</h3>
          <p className="text-muted-foreground">
            Empower your Twitch streams and Discord communities with custom, vibrant emotes created effortlessly.
          </p>
          <div className="flex space-x-4">
            {/* <a href="#" className="p-2 bg-gray-800 rounded-full">
              <TwitterIcon className="text-white w-5 h-5" />
            </a> */}
            <a href="https://discord.gg/GSKRnD4hB6" className="p-2 bg-gray-800 rounded-full">
              <BsDiscord className="text-white w-5 h-5" />
            </a>
            <a href="https://instagram.com/emotemakerai" className="p-2 bg-gray-800 rounded-full">
              <InstagramIcon className="text-white w-5 h-5" />
            </a>
            {/* <a href="#" className="p-2 bg-gray-800 rounded-full">
              <YoutubeIcon className="text-white w-5 h-5" />
            </a> */}
          </div>
        </div>
        {/* <div className="flex flex-col space-y-4">
          <h4 className="font-bold">PRODUCTS</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground">
                Web App
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Mobile Apps
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                API
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Integrations
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold">EXPLORE</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground">
                Finetuning
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Images
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                ControlNet
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Canvas
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Pixelate
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold">SUPPORT</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground">
                Knowledge Center
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                e-Learning Hub
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Feedback
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <Button variant="outline" className="w-full">
            Web
          </Button>
          <Button variant="outline" className="w-full">
            App Store
          </Button>
          <Button variant="outline" className="w-full">
            Google Play
          </Button>
        </div> */}
      </div>
    </footer>
  )
}

