import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(request: Request) {
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

    const resultsthree = await db
      .collection("selectBarData")
      .find({})
      .toArray();

    const selectresults = JSON.parse(JSON.stringify(resultsthree));

    return NextResponse.json({ selectresults }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 404 });
  }
}
