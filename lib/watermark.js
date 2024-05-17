import Jimp from "jimp";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function addWatermark(imageUrl, watermarkText) {
  try {
    const image = await Jimp.read(imageUrl);
    const font = await Jimp.loadFont(Jimp.inter);
    const textWidth = Jimp.measureText(font, watermarkText);
    const textHeight = Jimp.measureTextHeight(font, watermarkText);

    image.print(
      font,
      image.bitmap.width - textWidth - 10,
      image.bitmap.height - textHeight - 10,
      watermarkText,
      textWidth,
      textHeight
    );

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    console.log(buffer);
    return buffer;
  } catch (error) {
    console.error("Failed to add watermark:", error);
    throw error;
  }
}
