import { db } from "../lib/db";


type UserProps = {
  userId: string;
  name?: string;  // Optional name field
  email?: string; // Optional email field
};

export const getUser = async ({ userId, name, email }: UserProps) => {
  try {
    // First, try to find the user by ID
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    let user;
    if (!existingUser) {  // Check if the user does NOT exist
      // If user does not exist, create a new one
      user = await db.user.create({
        data: { id: userId, name, email },
      });
    } else {
      // If user exists, optionally update existing user
      user = await db.user.update({
        where: { id: userId },
        data: { name, email },
      });
    }

    console.log("User operation result:", user); // Debugging line
    return user;
  } catch (error) {
    console.log("[GET_USER] Error:", error); // Log any errors
    return null; // Return null or appropriate error handling
  }
}