import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./lib/user";
import GoogleProvider from "next-auth/providers/google";
import db from "./lib/db";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials.password === "") return null;

        const user = findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

   callbacks: {
    async signIn({ user }) {
      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name as string,
            password: "",
            image: user.image as string,
            role: Role.MEMBER,
          },
        });
      }

      return true;
    },
    async session({ session, token }) {
      // opcional: adiciona id do usuário à sessão
      const dbUser = await db.user.findUnique({
        where: { email: session.user?.email! },
      });

      if (dbUser) {
        session.user.role = dbUser.role;
      }

      return session;
    },
   }
});
