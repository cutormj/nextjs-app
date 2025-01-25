import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';
import Profile from '@/models/Profile';

export async function GET(req: NextRequest) {
  await dbConnect();
  console.log("Database connected");

  // Extract the username from the request URL
  const username = req.nextUrl.pathname.split('/').pop();
  console.log("THE USERNAME", username);

  if (!username) {
    return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
  }

  try {
    // Find user by username and select specific fields
    const user = await User.findOne({ username }, 'name email username image');

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Find profile by user ID and select specific fields
    const profile = await Profile.findOne({ userId: user._id }, 'bio website location');

    console.log("Fetched user:", user);
    console.log("Fetched profile:", profile); // Log the profile information

    return NextResponse.json({
      success: true,
      data: {
        user: {
          // name: user.name,
          // email: user.email,
          username: user.username,
          image: user.image,
        },
        profile: profile ? {
          bio: profile.bio,
          website: profile.website,
          location: profile.location,
        } : {},
      },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
