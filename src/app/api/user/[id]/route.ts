import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  // Connect to the database
  await dbConnect();
  console.log("Database connected");

  // Extract the username from the request URL
  const username = req.nextUrl.pathname.split("/").pop();
  console.log("THE USERNAME", username);

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  // Find the user by username without populating links.groupId
  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found", username }, { status: 404 });
  }

  // Return profile data along with branding colors
  return NextResponse.json({
    username: user.username,
    image: user.image,
    hotspotImage: user.hotspotImage,
    profile: user.profile,
    links: user.links,
    branding: user.branding, // ✅ Include branding colors
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}