import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';
import { auth } from '@/auth';

export async function GET() {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  // Get the session object
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    // If there's no session or session.user or session.user.email, return an unauthorized response
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;

  // Find the user by email without populating links.groupId
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    // If no user is found, return a 404 response
    return NextResponse.json({ error: 'User not found', userEmail }, { status: 404 });
  }

  // Return the profile data along with the username and additional details
  return NextResponse.json({
    username: user.username,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
    profile: user.profile,
    links: user.links,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

export async function PUT(req: Request) {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    // If there's no session or session.user or session.user.email, return an unauthorized response
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { username, bio } = await req.json();

  if (!username || !bio) {
    return NextResponse.json({ error: 'Username and bio are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.username = username;
    user.profile.bio = bio;

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
