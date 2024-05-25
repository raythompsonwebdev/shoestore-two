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
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultsfour = await db.collection("searchBarData").find({}).toArray();

    const searchresults = JSON.parse(JSON.stringify(resultsfour));

    return NextResponse.json({ searchresults }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 500 });
  }
}
