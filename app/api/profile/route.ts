import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId, name, bio, twitch, youtube, instagram, twitter, isPublic } = await req.json();
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Check if the profile exists
    const existingProfile = await db.profile.findUnique({
      where: { userId },
    });

    let updatedProfile;
    if (existingProfile) {
      // Update existing profile
      updatedProfile = await db.profile.update({
        where: { userId },
        data: { 
          name, 
          bio, 
          twitch, 
          youtube, 
          instagram, 
          twitter, 
          isPublic: isPublic !== undefined ? isPublic : existingProfile.isPublic 
        },
      });
    } else {
      // Create new profile if it doesn't exist
      updatedProfile = await db.profile.create({
        data: { 
          userId, 
          name, 
          bio, 
          twitch, 
          youtube, 
          instagram, 
          twitter, 
          isPublic: isPublic !== undefined ? isPublic : false 
        },
      });
    }

    return new NextResponse(JSON.stringify(updatedProfile), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error updating/creating profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}