import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";


export async function GET(request: Request) {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultsthree = await db
      .collection("selectBarData")
      .find({})
      .toArray();

    const selectresults = JSON.parse(JSON.stringify(resultsthree));

    return NextResponse.json({ selectresults });

    // return new Response(JSON.stringyy({product,accordian,searchresults,selectresults}))
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
