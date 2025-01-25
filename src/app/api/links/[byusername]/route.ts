import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Link from '@/models/Link';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    await dbConnect();
    console.log("Database connected");
  
    try {
      const { username, title, url, images } = await req.json();
  
      if (!username || !title || !url) {
        return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
  
      const newLink = await Link.create({ userId: user._id, title, url, images });
  
      return NextResponse.json({ success: true, data: newLink });
    } catch (error) {
      console.error("Failed to create link:", error);
      return NextResponse.json({ success: false, error: 'Internal server error' });
    }
  }

  export async function GET(req: NextRequest) {
    await dbConnect();
    console.log("Database connected");
  
    const username = req.nextUrl.pathname.split('/').pop();
    console.log("THE USERNAME", username);
  
    if (!username) {
      return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
    }
  
    try {
      const user = await User.findOne({ username }, '_id');
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
  
      const links = await Link.find({ userId: user._id }, 'title url images'); // Return limited data
  
      return NextResponse.json({ success: true, data: links });
    } catch (error) {
      console.error("Failed to fetch links:", error);
      return NextResponse.json({ success: false, error: 'Internal server error' });
    }
  }