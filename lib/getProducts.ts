import { NextResponse } from "next/server";
import clientPromise from "./mongodb";


export default async function getAccordian() {

  try {
    //await clientPromise
    const client = await clientPromise;
    const db = client.db("shoestore");

    const resultstwo = await db.collection("products").find({}).toArray();

    const products = JSON.parse(JSON.stringify(resultstwo));

    return products;

  } catch (err) {
    return NextResponse.json({ message: `${err}` });
  }
};
