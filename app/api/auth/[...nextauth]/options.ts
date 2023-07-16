import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import { connectToMongoDB } from "../../../../lib/dbConnect";
import User from "../../../../models/users";
// import { IUser } from "../../../../types";
import { comparePassword } from "../../../../lib/hashPassword";
// import {signJwtAccessToken, verifyJwt} from "../../../../lib/jwt"


export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credentials",
      name: "credentials",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToMongoDB().catch((err) => {
          throw new Error(err);
        });

        // confirm if user email already exists.
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // confirm whether password entered matches user password stored in db.
        const isPasswordCorrect = await comparePassword(
          credentials!.password,
          user.password
        );

        // if (isPasswordCorrect) {

        //   const accessToken = signJwtAccessToken(
        //     {
        //       user: {
        //         name: user.name,
        //         email: user.email,
        //       },
        //     }
        //   );

        //   user.accessToken = accessToken;

        // } else {
        //   throw new Error("Password is not valid");
        // }

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
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


