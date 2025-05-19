import { compareSync } from "bcrypt-ts";
import { User } from "@prisma/client";
import db from "./db";

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  const passwordMatch = await compareSync(password, user.password);
  
  if (passwordMatch) return user;

  return null;
}
