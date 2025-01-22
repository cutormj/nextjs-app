import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Profile from '@/models/Profile';
import User from '@/models/User';

// Handle GET requests to retrieve a profile
export async function GET(req: NextRequest) {
  console.log("Received a request");

  if (req.method !== 'GET') {
    console.log("Invalid method:", req.method);
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
  }

  await dbConnect();
  console.log("Database connected");

  try {
    // const { searchParams } = new URL(req.url);
    // const username = searchParams.get('username');

    // Extract the username from the request URL
    const username = req.nextUrl.pathname.split('/').pop();
    console.log("THE USERNAME", username);

    if (!username) {
      console.log("Username query parameter is required");
      return NextResponse.json({ success: false, error: 'Username query parameter is required' }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      console.log("Profile not found for user:", username);
      return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
    }

    console.log("Fetched profile:", profile);

    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve profile:", error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
