import { NextResponse } from "next/server";
import clientPromise from "./mongodb";


export default async function GetSingleProduct(prodname:string) {

  try {
    //await clientPromise
    const client = await clientPromise;

    const db = client.db("shoestore");
    const results = await db
      .collection("products")
      .findOne({ name: prodname });

    const product = JSON.parse(JSON.stringify(results));

    return product;

  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
};
