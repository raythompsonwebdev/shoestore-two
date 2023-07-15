import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";


export async function GET(request: Request) {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const results = await db.collection("products").find({}).toArray();

    const product = JSON.parse(JSON.stringify(results));

    return NextResponse.json({ product });

    // return new Response(JSON.stringyy({product,accordian,searchresults,selectresults}))
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
