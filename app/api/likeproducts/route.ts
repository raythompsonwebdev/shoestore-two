import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import type { NextRequest } from 'next/server'
import sanitize from "mongo-sanitize";

// type Like = {
//   likes?: number,
// }

export async function POST(request: NextRequest) {

  //const data: Like = await request.json()
  //console.log('data: ', data)

  if(request.method !== 'POST'){
    return NextResponse.json({ message: 'Only POST requests allowed' })
  }

  const {product} :any = {...request.body};

  const sanitizedProduct = sanitize(product);

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");

    const productsInfo = await db
      .collection("products")
      .findOne({ name: sanitizedProduct });

    // The optional chaining operator (?.)-fixes object is possible null error for productsInfo variable. The non-null assertion operator (!.) or the nullish coalescing operator (??) & if (typeof myName === 'string').
    await db.collection("products").updateOne(
      { name: sanitizedProduct },
      {
        $set: {
          likes: productsInfo?.likes + 1,
        },
      }
    );

    const updatedProductInfo = await db
      .collection("products")
      .findOne({ name: sanitizedProduct });

    return NextResponse.json({ updatedProductInfo });
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
