"use server";

import { signIn } from "@/auth";

export default async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return { status: 200, message: "User logged in" };
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      error.message = "Credenciais inválidas";
    }
    return { status: 400, message: error.message };
  }
}
