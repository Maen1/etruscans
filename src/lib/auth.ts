import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeAdmin } from "../features/admin/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "PI Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        return authorizeAdmin(credentials?.username, credentials?.password);
      }
    })
  ],
  session: {
    strategy: "jwt",
  }
};
