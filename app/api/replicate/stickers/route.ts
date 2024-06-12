import Replicate from 'replicate';
import { NextResponse } from "next/server";

// Assuming you might need authentication or other environment variables
// import { auth } from "@clerk/nextjs";

export const maxDuration = 300;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    // Example of how you might handle authentication if needed
    // const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // Validate input
    if (!prompt) {
      return new NextResponse("A prompt is required", { status: 400 });
    }

    // Example of handling additional fields if necessary
    // if (!someOtherField) {
    //   return new NextResponse("Some other field is required", { status: 400 });
    // }

    const output = await replicate.run("fofr/sticker-maker:6443cc831f51eb01333f50b757157411d7cadb6215144cc721e3688b70004ad0", { 
        input: {
            steps: 20,
            width: 1024,
            height: 1024,
            prompt: prompt,
            upscale: true,
            upscale_steps: 10,
            negative_prompt: ""
        }
    });
    console.log(output);

    // Optionally, you could save the request or response to a database here
    // await db.someModel.create({
    //   data: {
    //     image: image,
    //     userId: userId,
    //   }
    // });

    return NextResponse.json(output);

  } catch (error) {
    console.log('[BG_REMOVE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};