import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: Request) {
  console.log(request.body);

  if (request.method === "GET") {
    return NextResponse.json({ message: "Only GET requests allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");
    const results = await db.collection("products").find({}).toArray();
    //const results = await db.collection('products').find({$or:[{ "size":  `${val1}`} ,{ "color": `${val2}` },{ "gender": `${val3}` },{ "style": `${val4}` }]} ).toArray()

    if (results.length > 0) {
      console.log(`${results.length} customers found`);
      // Here you could build your html or put the results in some other data structure you want to work with
    } else {
      console.log(`No customers found`);
    }

    const productsearch = JSON.parse(JSON.stringify(results));

    return NextResponse.json(productsearch);
  } catch (err) {
    return NextResponse.json({ message: `${err}` }, { status: 404 });
  }
}
