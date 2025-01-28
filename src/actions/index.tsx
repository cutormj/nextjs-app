'use server';

import { signIn, signOut } from "@/auth";
import User from "@/models/User";
// import Profile from "@/models/Profile";
// import dbConnect from '@/lib/mongo';

export async function doSocialLogin(formData: FormData) {
    const action = formData.get('action') as string;
    await signIn(action, { redirectTo: "/protected/dashboard" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export const getUserByUsername = async (findusername: string) => {
  const user = await User.findOne({ username: findusername });
  console.log("THE USER!", user);

  // Return null if no user is found
  if (!user) {
    return null;
  }

  return user; // Return the found user
};

// export const getProfileByEmail = async (email: string) => {
//   await dbConnect(); // Ensure the database connection is established

//   // Find the user by email
//   const user = await User.findOne({ email });

//   // Return null if no user is found
//   if (!user) {
//     console.log("User not found:", email);
//     return null;
//   }

//   // Find the profile by user ID
//   const profile = await Profile.findOne({ userId: user._id });

//   // Return null if no profile is found
//   if (!profile) {
//     console.log("Profile not found for user:", email);
//     return null;
//   }

//   console.log("Fetched profile:", profile);
//   return profile; // Return the found profile
// };