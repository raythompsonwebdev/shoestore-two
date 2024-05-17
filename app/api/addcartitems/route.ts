import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";
import sanitize from "mongo-sanitize";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    NextResponse.json({ message: "Only POST requests allowed" });
    return;
  }

  const body = await req.json();

  const cartResults = body.cartItems;
  const cartUser = body.user;

  // get array of cart item id's
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const cartItemId = cartResults.map((id: any) => id._id);

  //console.log(cartItemId);

  const useremail = sanitize(cartUser.email);

  try {
    const client = await clientPromise;
    const db = client.db("shoestore");

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { email: useremail },
        { $set: { cartitems: cartResults } },
        { returnDocument: "after" }
      );

    // const updatedProductInfo = await db
    //   .collection('cartItems')
    //   .findOne({ product })

    return NextResponse.json({ cartItemsResult: result?.cartitems });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
