import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import sanitize from "mongo-sanitize";

export async function GET(request: Request) {

  const body = sanitize(request.body);

// const [val1,val2,val3,val4] = context.query.resultArray

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
    return NextResponse.json({ message: `${err}` },{status:404});
  }
}
