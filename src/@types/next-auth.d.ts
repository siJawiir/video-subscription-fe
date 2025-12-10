import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: int;
    username?: string | null;
    role?: number;
    token?: string | null;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
