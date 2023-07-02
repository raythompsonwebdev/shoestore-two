// This is an example of how to read a JSON Web Token from an API route
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../lib/dbConnect";
import User from "../../../models/users";
import { IUser } from "../../../types/index";
import { hashPassword } from "../../../lib/hashPassword";
import sanitize from "mongo-sanitize";

export async function POST(request: any) {
  const name = sanitize(request.body?.name);
  const email = sanitize(request.body?.email);
  const password = sanitize(request.body?.password);
  const dateSubmitted = new Date().toString().substring(0, 24);

  try {
    // connect to mungodb
    connectToMongoDB().catch((err) => request.json(err));

    // confirm whether email already exist in database.
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ error: "User Already exists" });
    } else {
      if (password.length < 6)
        return NextResponse.json({
          error: "Password should be 6 characters long",
        });

      // Hash password
      const hashpassword = await hashPassword(password);

      // create new user
      const user = User.create({
        name,
        email,
        password: hashpassword,
        date: dateSubmitted,
      });

      return NextResponse.json({
        success: true,
        user,
      });
    }
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
