import { RGBColor } from "react-color"
import { fabric } from "fabric"

export function isTextType (type: string | undefined) {
    return type === "text" || type === "textbox" || type === "i-text"
}

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
    if (rgba === "transparent") {
        return "rgba(0, 0, 0, 0)"
    }

    const alpha = rgba.a === undefined ? 1 : rgba.a;

    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`
}

export const createFilter = (value: string) => {
    let effect;

    switch (value) {
        case "polaroid":
            // @ts-ignore
            effect = new fabric.Image.filters.Polaroid();
            break;
        case "sepia":
            effect = new fabric.Image.filters.Sepia();
            break;
        case "kodachrome":
            // @ts-ignore
            effect = new fabric.Image.filters.Kodachrome();
            break;
        case "contrast":
            effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
            break;
        case "brightness":
            effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
            break;
        case "brownie":
            // @ts-ignore
            effect = new fabric.Image.filters.Brownie();
            break;
        case "vintage":
            // @ts-ignore
            effect = new fabric.Image.filters.Vintage();
            break;
        case "technicolor":
            // @ts-ignore
            effect = new fabric.Image.filters.Technicolor();
            break;
        case "pixelate":
            effect = new fabric.Image.filters.Pixelate();
            break;
        case "invert":
            effect = new fabric.Image.filters.Invert();
            break;
        case "blur":
            effect = new fabric.Image.filters.Blur();
            break;
        case "sharpen":
            effect = new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
            });
            break;
        case "emboss":
            effect = new fabric.Image.filters.Convolute({
                matrix: [1, 1, 1,1, 0.7, -1, -1, -1, -1]
            });
            break;
        case "removecolor":
            // @ts-ignore
            effect = new fabric.Image.filters.RemoveColor({
                threshold: 0.2,
                distance: 0.5
            });
            break;
        case "blacknwhite":
            // @ts-ignore
            effect = new fabric.Image.filters.BlackWhite();
            break;
        case "vibrance":
            // @ts-ignore
            effect = new fabric.Image.filters.Vibrance({
                vibrance: 1,
            });
            break;
        case "blendcolor":
            effect = new fabric.Image.filters.BlendColor({
                color: "#00ff00",
                mode: "multiply"
            });
            break;
        case "huerotate":
            effect = new fabric.Image.filters.HueRotation({
                rotation: 0.5
            });
            break;
        case "resize":
            effect = new fabric.Image.filters.Resize();
            break;
        case "gamma":
            // @ts-ignore
            effect = new fabric.Image.filters.Gamma({
                gamma: [1, 0.5, 2.1]
            });
            break;
        default: 
            effect = null;
            return;
    }

    return effect
}

export const generateThemedEmotePrompt = (prompt: string, theme: string) => {
    let styleDescription = '';
    let additionalDetails = '';
  
    switch (theme.toLowerCase()) {
        case 'pixel':
            styleDescription = 'in a pixel art style';
            additionalDetails = 'The design should use a limited color palette and visible pixels, reminiscent of early video game graphics.';
            break;
        case 'kawaii':
            styleDescription = 'in a kawaii style';
            additionalDetails = 'The design should be ultra-cute with soft colors, simple shapes, and possibly blush marks on the cheeks.';
            break;
        case 'object':
            styleDescription = 'as an object';
            additionalDetails = 'The emote should represent a physical object with clear, simple lines and vibrant colors.';
            break;
        case 'cute-bold-line':
            styleDescription = 'with cute bold lines';
            additionalDetails = 'The design should feature bold, rounded lines that enhance the cuteness of the emote.';
            break;
        case 'text-based':
            styleDescription = 'as text-based';
            additionalDetails = 'The emote should primarily use stylized text or calligraphy to convey an expression or sentiment.';
            break;
        case '3d-based':
            styleDescription = 'in a 3D style';
            additionalDetails = 'The emote should have a three-dimensional appearance, with detailed shading and lighting to enhance depth.';
            break;
        case 'pepe-based':
            styleDescription = 'in a Pepe style';
            additionalDetails = 'The emote should mimic the distinctive, somewhat crude art style of Pepe the Frog memes.';
            break;
        case 'sticker-based':
            styleDescription = 'as a sticker';
            additionalDetails = 'The emote should look like a sticker, possibly with a white border and shadow to give it a lifted effect.';
            break;
        case 'chibi':
            styleDescription = 'in a chibi style';
            additionalDetails = 'The character should have large, expressive eyes and a cute, simplified design with an oversized head and small body.';
            break;
        case 'meme':
            styleDescription = 'as a meme';
            additionalDetails = 'The emote should incorporate elements of popular memes, using humor and recognizable themes.';
            break;
        case 'ghibli':
            styleDescription = 'inspired by Studio Ghibli\'s art style';
            additionalDetails = 'The emote should have a whimsical, hand-drawn quality with soft edges and a slightly muted color palette.';
            break;
        default:
            // Provide a generic description if the theme is not recognized
            styleDescription = 'with a unique style';
            additionalDetails = 'The design should be visually appealing and recognizable at a small scale.';
    }

    return `Design a single, expressive digital emote ${styleDescription}, suitable for use on a Twitch streamer's channel. The emote should depict ${prompt}, ensuring visibility and impact at a small scale. It should feature exaggerated characteristics appropriate for ${prompt}, conveying a specific emotion or reaction. ${additionalDetails} The background should be transparent for seamless integration into various Twitch chat backgrounds, or have a solid white background if transparency is not available. The emote should be part of a cohesive set that could be expanded with additional designs.`;
}