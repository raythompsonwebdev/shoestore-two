import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";
import sanitize from "mongo-sanitize";

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "GET requests not allowed" });
  }

  const body = await request.json();
  const { likes, product } = body;
  const sanitizedProduct = sanitize(product);

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");
    const productsInfo = await db
      .collection("products")
      .findOne({ name: sanitizedProduct, likes });
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
    return NextResponse.json(updatedProductInfo);
  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
}
