import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("shoestore");

    const results = await db.collection("products").find({}).toArray();

    const product = JSON.parse(JSON.stringify(results));

    return NextResponse.json({
      product,
    });
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
