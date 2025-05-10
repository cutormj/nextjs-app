import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import { auth } from "@/auth";

const defaultBranding = {
  primary: "#1E293B",
  secondary: "#F8FAFC",
  accent: "#EF4444",
  background: "#E2E8F0",
  textPrimary: "#FFFFFF",
  textSecondary: "#64748B",
};

export async function GET() {
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return NextResponse.json({ error: "User not found", userEmail }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username,
    email: user.email,
    name: user.name,
    image: user.image,
    hotspotImage: user.hotspotImage,
    role: user.role,
    profile: user.profile,
    links: user.links,
    branding: user.branding ?? defaultBranding, // ✅ Ensures branding has default values
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

export async function PUT(req: Request) {
  await dbConnect();
  console.log("Database connected");

  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { username, bio, hotspotImage, branding } = await req.json();

  if (!username || !bio) {
    return NextResponse.json({ error: "Username and bio are required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.username = username;
    user.profile.bio = bio;

    if (hotspotImage) {
      user.hotspotImage = hotspotImage;
    }

    if (branding) {
      user.branding = { ...defaultBranding, ...user.branding, ...branding }; // ✅ Preserves defaults & allows updates
    }

    await user.save();

    return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}