import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

// GET request handler
export async function GET() {
  await dbConnect();
  console.log("Database connected");

  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
