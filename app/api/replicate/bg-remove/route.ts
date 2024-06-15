
import Replicate from 'replicate';
import { NextResponse } from "next/server";

// Assuming you might need authentication or other environment variables
// import { auth } from "@clerk/nextjs";

export const maxDuration = 300

export const dynamic = 'force-dynamic';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    // Example of how you might handle authentication if needed
    // const { userId } = auth();
    const body = await req.json();
    const { image } = body;

    // Validate input
    if (!image) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Example of handling additional fields if necessary
    // if (!someOtherField) {
    //   return new NextResponse("Some other field is required", { status: 400 });
    // }

    const output = await replicate.run("lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1", { input: { image } });
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