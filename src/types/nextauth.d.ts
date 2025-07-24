import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role?: string;
      id?: number;
    };
  }

  interface User extends DefaultUser {
    role?: string;
    id?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: number;
  }
}
