'use server'

import { signIn, signOut } from "@/auth";

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
