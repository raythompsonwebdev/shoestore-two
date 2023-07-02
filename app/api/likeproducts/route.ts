import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import sanitize from "mongo-sanitize";

export async function POST(request: any) {
  const product = sanitize(request.body.product);

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");

    const productsInfo = await db
      .collection("products")
      .findOne({ name: product });

    // The optional chaining operator (?.)-fixes object is possible null error for productsInfo variable. The non-null assertion operator (!.) or the nullish coalescing operator (??) & if (typeof myName === 'string').
    await db.collection("products").updateOne(
      { name: product },
      {
        $set: {
          likes: productsInfo?.likes + 1,
        },
      }
    );

    const updatedProductInfo = await db
      .collection("products")
      .findOne({ name: product });

    return NextResponse.json({ updatedProductInfo });
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
