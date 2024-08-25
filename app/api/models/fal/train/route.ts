import { auth } from "@clerk/nextjs/server";
import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images_data_url, steps, rank, learning_rate, experimental_optimizers, experimental_multi_checkpoints_count } = body;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await fal.subscribe("fal-ai/flux-lora-general-training", {
      input: {
        images_data_url,
        steps: steps || 1000,
        rank: rank || 16,
        learning_rate: learning_rate || 0.0004,
        experimental_optimizers: experimental_optimizers || "adamw8bit",
        experimental_multi_checkpoints_count: experimental_multi_checkpoints_count || 1,
      },
      logs: true,
      // onQueueUpdate: (update) => {
      //   if (update.status === "IN_PROGRESS") {
      //     update.logs.map((log) => log.message).forEach(console.log);
      //   }
      // },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log('[TRAINING_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}