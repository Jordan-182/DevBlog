import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import {
  Account,
  NextAuthOptions,
  Profile,
  SessionStrategy,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
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
    async signIn({
      user,
    }: {
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
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
          console.log("user image : ", user.image);
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
};
