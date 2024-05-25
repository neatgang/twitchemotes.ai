import { auth } from "@clerk/nextjs/server";


// import { MAX_FREE_COUNTS } from "@/constants";
import { db } from "./db";

const MAX_FREE_COUNTS = 5;

// export const runtime = "edge"

export const incrementApiLimit = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};

export const decrementApiLimit = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit && userApiLimit.count > 0) {
    await db.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count - 1 },
    });
  }
};