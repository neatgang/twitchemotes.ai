import { z } from "zod";

export const emoteTypes = [
    { 
        name: "Pixel Emotes", 
        link: "/pixels",
        finalPrompt: "Create a pixel art emote based on the following description: ${description}"
    },
    { 
        name: "Kawaii Emotes", 
        link: "/kawaii",
        finalPrompt: "Design a Kawaii-style emote with cute, simple features and vibrant colors: ${description}"
    },
    { 
        name: "Object Emotes", 
        link: "/objects",
        finalPrompt: "Generate an object-based emote that represents the following item: ${description}"
    },
    { 
        name: "Cute Bold Line Emotes", 
        link: "/cuteboldlines",
        finalPrompt: "Create a bold line emote that is cute and simple, focusing on clear, thick lines: ${description}"
    },
    { 
        name: "Text Based Emotes", 
        link: "/textbased",
        finalPrompt: "Design a bold and vibrant text-based icon featuring the word or phrase '${description}' in an ultra-bold, sans-serif font."
    },
    { 
        name: "3D Based Emotes", 
        link: "/3d",
        finalPrompt: "Create a 3D emote with realistic textures and lighting based on this concept: ${description}"
    },
    { 
        name: "Pepe Based Emotes", 
        link: "/pepethefrog",
        finalPrompt: "Generate a Pepe the Frog style emote that captures the following emotion or activity: ${description}"
    },
    { 
        name: "Sticker Based Emotes", 
        link: "/stickers",
        finalPrompt: "Create a sticker-style emote with a clear outline and bold colors representing: ${description}"
    },
    { 
        name: "Chibi Emotes", 
        link: "/chibi",
        finalPrompt: "Design a chibi-style emote that is playful and adorable, emphasizing exaggerated proportions: ${description}"
    },
    { 
        name: "Meme Emotes", 
        link: "/meme",
        finalPrompt: "Create a meme-based emote that humorously conveys the following concept: ${description}"
    }
];

export const formSchema = z.object({
    // description: z.string().min(1, {
    //   message: "A description is required"
    // }),
    amount: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    resolution: z.string().min(1).optional(),
    emoteType: z.string().min(1).optional(),
    prompt: z.string().min(1).optional(),
    // imageUrl: z.string().min(1, {
    //   message: "Image is required",
    // }),
    // templates: z.string(),
    // emotion: z.string().min(1, { // New field for emotion
    //   message: "Emotion is required"
    // }),
    // additionalAttributes: z.string().min(1, { // New field for additional attributes
    //   message: "Additional attributes are required"
    // }),
  });