import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests allowed" },
      { status: 500 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");
    const results = await db.collection("products").find({}).toArray();
    //const results = await db.collection('products').find({$or:[{ "size":  `${val1}`} ,{ "color": `${val2}` },{ "gender": `${val3}` },{ "style": `${val4}` }]} ).toArray()

    if (results.length > 0) {
      console.log(`${results.length} customers found`);
    } else {
      console.log(`No customers found`);
    }

    const productsearch = JSON.parse(JSON.stringify(results));

    return NextResponse.json(productsearch, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 404 });
  }
}
