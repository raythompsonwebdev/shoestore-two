import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Only GET requests allowed" },
      { status: 500 }
    );
  }
  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultstwo = await db.collection("accordianData").find({}).toArray();

    const accordian = JSON.parse(JSON.stringify(resultstwo));

    return NextResponse.json({ accordian }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 500 });
  }
}
