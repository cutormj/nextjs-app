import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';
import { auth } from '@/auth';

// GET Endpoint
export async function GET() {
  await dbConnect();
  console.log('Database connected');

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

    return NextResponse.json(user.links, { status: 200 });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST Endpoint
export async function POST(req: Request) {
  await dbConnect();
  console.log('Database connected');

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { url, shortDescription, description, images, groupId } = await req.json();

  if (!url || !shortDescription || !description) {
    return NextResponse.json(
      { error: 'URL, short description, and description are required' },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newLink = {
      url,
      shortDescription,
      description,
      images: images || [],
      groupId: groupId || null,
    };

    user.links.push(newLink);
    await user.save();

    return NextResponse.json(
      { message: 'Link added successfully', link: newLink },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding link:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT Endpoint (Edit/Modify Link)
export async function PUT(req: Request) {
  await dbConnect();
  console.log('Database connected');

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { _id, url, shortDescription, description, images, groupId } = await req.json();

  if (!_id || !url || !shortDescription || !description) {
    return NextResponse.json(
      { error: 'Link ID, URL, short description, and description are required' },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail, 'links._id': _id },
      {
        $set: {
          'links.$.url': url,
          'links.$.shortDescription': shortDescription,
          'links.$.description': description,
          'links.$.images': images || [],
          'links.$.groupId': groupId || null,
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found or link not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Link updated successfully', links: user.links },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE Endpoint
export async function DELETE(req: Request) {
  await dbConnect();
  console.log('Database connected');

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

    return NextResponse.json(
      { message: 'Link deleted successfully', links: user.links },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}