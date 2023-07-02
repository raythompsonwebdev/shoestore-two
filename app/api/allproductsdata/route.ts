import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import sanitize from "mongo-sanitize";

export async function GET(request: Request) {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const results = await db.collection("products").find({}).toArray();
    const resultstwo = await db.collection("accordianData").find({}).toArray();
    const resultsthree = await db
      .collection("selectBarData")
      .find({})
      .toArray();
    const resultsfour = await db.collection("searchBarData").find({}).toArray();

    const product = JSON.parse(JSON.stringify(results));
    const accordian = JSON.parse(JSON.stringify(resultstwo));
    const searchresults = JSON.parse(JSON.stringify(resultsfour));
    const selectresults = JSON.parse(JSON.stringify(resultsthree));

    return NextResponse.json({
      product,
      accordian,
      searchresults,
      selectresults,
    });

    // return new Response(JSON.stringyy({product,accordian,searchresults,selectresults}))
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
