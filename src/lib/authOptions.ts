import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface UserRow {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const name = user.name ? user.name.split(" ")[0] : "Utilisateur connecté";

      try {
        const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        );

        if (rows.length === 0) {
          await db.query(
            `INSERT INTO users (name, email, avatar, status) VALUES (?, ?, ?, ?)`,
            [name, user.email, user.image, "Reader"]
          );
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }

      const email = user?.email ?? token.email;

      if (email) {
        const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );

        const dbUser = rows[0];
        if (dbUser) {
          token.role = dbUser.status;
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};
