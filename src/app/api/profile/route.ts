// The main purpose of this code is to create an API endpoint 
// that handles POST requests for creating a new user profile. 
// It connects to the MongoDB database, validates the request data, checks if the user exists, 
// and then creates a new profile for the user if all conditions are met.
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import Profile from '@/models/Profile';
import User from '@/models/User';

export async function PUT(req: NextRequest) {
  console.log("Received a request");

  // Ensure the method is PUT
  if (req.method !== 'PUT') {
    console.log("Invalid method:", req.method);
    return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
  }

  // Connect to the MongoDB database
  await dbConnect();
  console.log("Database connected");

  try {
    // Validate request body
    if (!req.body) {
      console.log("Empty request body");
      return NextResponse.json({ success: false, error: 'Request body is empty' }, { status: 400 });
    }

    // Parse the JSON body of the request
    const body = await req.json();
    console.log("Request body parsed:", body);

    const { email, bio, website, location } = body;

    // if (!username) {
    //   console.log("Username is required");
    //   return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
    // }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Find and update the profile
    const profile = await Profile.findOneAndUpdate(
      { userId: user._id },
      { bio, website, location },
      { new: true, upsert: true } // upsert: true creates a new profile if one doesn't exist
    );

    console.log("Updated profile:", profile); // Log the updated profile information

    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
