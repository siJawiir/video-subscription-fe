import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const json = await res.json();

          if (!json.success || !json.data?.user) return null;

          const user = json.data.user;

          return {
            id: user.user_id.toString(),
            username: user.username,
            role: user.role,
            token: json.data.token,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  // -------------------------------------------------------
  // JWT + Session
  // -------------------------------------------------------
  callbacks: {
    /**
     * 🔐 JWT Callback
     */
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.token = user.token;
      }

      // Saat refresh token
      if (trigger === "update" && session?.user) {
        token.id = session.user.id;
        token.role = session.user.role;
        token.username = session.user.username;
        token.token = session.user.token;
      }

      return token;
    },

    /**
     * 🧑‍💼 Session Callback
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as number;
        session.user.username = token.username as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
