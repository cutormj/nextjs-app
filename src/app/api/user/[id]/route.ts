import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  // Extract the username from the request URL
  const username = req.nextUrl.pathname.split('/').pop();
  console.log("THE USERNAME", username);

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  // Find the user by username without populating links.groupId
  const user = await User.findOne({ username });

  if (!user) {
    // If no user is found, return a 404 response
    return NextResponse.json({ error: 'User not found', username }, { status: 404 });
  }

  // Return the profile data along with the username and additional details
  return NextResponse.json({
    username: user.username,
    // email: user.email,
    // name: user.name,
    image: user.image,
    // role: user.role,
    profile: user.profile,
    links: user.links,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}
