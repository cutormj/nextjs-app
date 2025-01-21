import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

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
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    console.log("Fetched user:", user); // Log the user information

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
