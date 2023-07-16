
import { NextResponse } from 'next/server'
import clientPromise from "../../../lib/mongodb";


export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  //const name = searchParams.get('name')
  //const instrument = searchParams.get('instrument')

  const obj = Object.fromEntries(searchParams.entries())

  console.log(obj)

  try {
    //await clientPromise
    const client = await clientPromise;

    const db = client.db("shoestore");
    // const results = await db
    //   .collection("products")
    //   .findOne({ name: productName });
    const results = await db.collection("products").find({}).toArray();

    const product = JSON.parse(JSON.stringify(results));

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
