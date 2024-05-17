import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import connectToMongoose from "../../../../lib/dbConnect";
import User from "../../../../models/users";
// import { IUser } from "../../../../types";
import { comparePassword } from "../../../../lib/hashPassword";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToMongoose();
        // const client = await clientPromise;
        // const db = client.db("shoestore");

        // // confirm if user email already exists.
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error(
            "Invalid credentials! Please enter valid credentials"
          );
        }

        if (user.email !== credentials?.email) {
          throw new Error("Invalid email! Please enter valid email");
        }

        // confirm whether password entered matches user password stored in db.
        if (credentials?.password !== undefined) {
          const isPasswordCorrect = await comparePassword(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid password Please enter valid password");
          }
        }

        if (user) {
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.SECRET_KEY,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return {
        ...session,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};
