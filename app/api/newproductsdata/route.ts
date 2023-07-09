import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";


export async function GET(request: Request) {

  if(request.method !== 'GET'){
    return NextResponse.json({ message: 'Only GET requests allowed' })
  }

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const results = await db.collection("products").find({}).toArray();
    const resultstwo = await db.collection("accordianData").find({}).toArray();
    const resultsfour = await db.collection("searchBarData").find({}).toArray();

    const product = JSON.parse(JSON.stringify(results));
    const accordian = JSON.parse(JSON.stringify(resultstwo));
    const searchresults = JSON.parse(JSON.stringify(resultsfour));

    return NextResponse.json({ product, accordian, searchresults });
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
