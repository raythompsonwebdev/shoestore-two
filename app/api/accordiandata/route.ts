import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultstwo = await db.collection("accordianData").find({}).toArray();

    const accordian = JSON.parse(JSON.stringify(resultstwo));

    return NextResponse.json({ accordian });

  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
