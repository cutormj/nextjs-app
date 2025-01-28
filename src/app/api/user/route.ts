import {  NextResponse } from 'next/server'; 
// NextRequest,
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
