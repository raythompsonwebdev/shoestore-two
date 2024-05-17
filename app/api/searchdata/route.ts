import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultsfour = await db.collection("searchBarData").find({}).toArray();

    const searchresults = JSON.parse(JSON.stringify(resultsfour));

    return NextResponse.json({ searchresults });
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
