import Replicate from "replicate";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

// export const config = {
//   runtime: 'edge',
// }

export const maxDuration = 300;

interface ReplicateResponse {
  output: string;
  // Include other properties as needed
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export async function POST(req: Request) {
  console.log('POST function called'); // Add this line
  try {
    const body = await req.json();
    const { imageUrl } = body; // Get the imageUrl from the request body
    console.log('imageUrl:', imageUrl); // Add this line

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const response = await replicate.run(
      "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
      {
        input: {
          image: imageUrl // Use the imageUrl here
        }
      }
    ) as ReplicateResponse;

    console.log(response)

    // Extract the prompt from the response
    // const prompt = response.output
    // const output = prompt.output;
    console.log('prompt:', prompt); // Add this line

    // Return the prompt to the client
    if (prompt !== undefined) {
      return NextResponse.json(prompt);
    } else {
      return new NextResponse("No prompt generated", { status: 500 });
    }

  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};