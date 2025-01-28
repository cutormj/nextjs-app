import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';
import { auth } from '@/auth';

export async function GET() {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    const user = await User.findOne({ email: userEmail }).select('links');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the links array
    return NextResponse.json(user.links, { status: 200 });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { url, shortDescription, images, groupId } = await req.json();

  if (!url || !shortDescription) {
    return NextResponse.json({ error: 'URL and short description are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newLink = {
      url,
      shortDescription,
      images: images || [],
      groupId: groupId || null,
    };

    user.links.push(newLink);
    await user.save();

    return NextResponse.json({ message: 'Link added successfully', link: newLink }, { status: 201 });
  } catch (error) {
    console.error('Error adding link:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { linkId } = await req.json();

  if (!linkId) {
    return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { links: { _id: linkId } } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Link deleted successfully', links: user.links }, { status: 200 });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

