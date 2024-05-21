import { db } from "@/lib/db";


async function ensureUserSubscriptions() {
  // Fetch all subscriptions
  const subscriptions = await db.userSubscription.findMany({
    include: {
      user: true,
    },
  });

  for (const subscription of subscriptions) {
    if (!subscription.user) {
      // Create a new user if it doesn't exist
      const newUser = await db.user.create({
        data: {
          // Add necessary user fields here
          email: subscription.email, // Assuming email is a required field for User
          name: subscription.name, // Assuming name is available and required
        },
      });

      // Update the subscription with the new userId
      await db.userSubscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          userId: newUser.id,
        },
      });
    }
  }
}

ensureUserSubscriptions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
