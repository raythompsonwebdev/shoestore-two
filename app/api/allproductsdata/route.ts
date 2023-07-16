import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const results = await db.collection("products").find({}).toArray();
    const resultsthree = await db
      .collection("selectBarData")
      .find({})
      .toArray();

    const product = JSON.parse(JSON.stringify(results));
    const selectresults = JSON.parse(JSON.stringify(resultsthree));

    return NextResponse.json({
      product,
      selectresults,
    });

    // return new Response(JSON.stringyy({product,accordian,searchresults,selectresults}))
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
