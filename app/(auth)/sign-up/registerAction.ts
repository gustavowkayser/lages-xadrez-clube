'use server';

import { signIn } from "@/auth";
import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(formData: FormData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  
  // Validate the data
  if (!data.name || !data.email || !data.password) {
    return { status: 400, message: "Preencha todos os campos" };
  }

  // Check if the email is already in use
  const existingUser = await db.user.findUnique({
    where: {
      email: data.email as string,
    }
  });

  if (existingUser) {
    return { status: 400, message: "Este e-mail já está em uso" };
  }

  // Create the user
  try {
    const user = await db.user.create({
      data: {
        name: data.name as string,
        email: data.email as string,
        password: hashSync(data.password as string),
      }
    });
    console.log("User created successfully:", user);

    return { status: 200, message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: 500, message: "Internal server error" };
  }
}

export async function registerGoogleAction() {
  await signIn("google", {
    redirect: true,
    callbackUrl: "/",
  });

  return { status: 200, message: "User logged in" };
}