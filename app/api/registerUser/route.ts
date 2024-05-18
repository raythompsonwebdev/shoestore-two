import { NextResponse, NextRequest } from "next/server";
import connectToMongoose from "../../../lib/dbConnect";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/users";
// import { IUser } from "../../../types/index";
import { hashPassword } from "../../../lib/hashPassword";
import sanitize from "mongo-sanitize";

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "GET requests not allowed" });
  }

  const client = await clientPromise;
  const db = client.db("shoestore");

  const body = await request.json();

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const password = sanitize(body.password);
  const dateSubmitted = new Date().toString().substring(0, 24);

  try {
    await connectToMongoose();

    // confirm whether email already exist in database.
    const userExists = await User.findOne({ email }).exec();

    if (userExists !== null) {
      return NextResponse.json(
        { error: "User Already exists" },
        { status: 403 }
      );
    } else {
      if (password.length < 10)
        return NextResponse.json(
          {
            error: "Password should be 10 characters or longer",
          },
          { status: 403 }
        );

      // Hash password
      const hashpassword = await hashPassword(password);

      // create new user
      const user = await db.collection("users").insertOne({
        name,
        email,
        password: hashpassword,
        date: dateSubmitted,
        image: "./images/one.jpg",
        cartitems: [],
      });

      return NextResponse.json(
        {
          success: true,
          user,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 200 });
  }
}
