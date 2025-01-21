'use server'

import { signIn, signOut } from "@/auth";
import User from "@/models/User";

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
  const user = await User.findById({ username: findusername });
  console.log("THE USER!", user);

  // Return null if no user is found
  if (!user) {
    return null;
  }

  return user; // Return the found user
};
