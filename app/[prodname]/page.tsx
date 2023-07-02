/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
// import LikesSection from "../../components/LikesSection";

export default async function SingleProduct({params} :any) {

  console.log(params.prodname)

  // const [singleProduct] = useState(product);
  // const [productInfo, setProductInfo] = useState({ likes: 0 });

  const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR(
    `/api/singleproduct`,
    fetcher
  );

  if (error) return <div>Failed to fetch users.</div>
    if (isLoading) return <h2>Loading...</h2>


  // const { _id, color, imgUrl, name, price, size, style, text }: any = {
  //   ...singleProduct,
  // };

 const singleProduct = data.filter((prod:any) => prod.name === params.prodname ? prod : false)

 const result = singleProduct[0];

 console.log(result)

  return result ? (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Product Page</h1>
        <figure id="product-page-box">
          <Image
              id="product-page-img"
              src={result.imgUrl}
              alt={result.style}
              width={175}
              height={150}
            />
          <figcaption id="product-page-caption">
              <p className="product-page-title"> {result.name}</p>
              <p id="product-page-price">£{result.price}</p>
              <p className="product-page-title">Size : {result.size}</p>
              <p className="product-page-title">Color : {result.color}</p>
              <p>{result.text}</p>

              {/* <LikesSection
                likes={productInfo.likes}
                productName={prodname}
                setProductInfo={setProductInfo}
                prodid={_id}
              /> */}

              {/* <button onClick={() => onAdd(product)}>Add To Cart</button> */}
            </figcaption>
        </figure>
      </main>
    </>
  ) : (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">New Product Page</h1>
        <figure id="product-page-box">
          <figcaption id="product-page-caption">
            <p className="product-page-title">product not found</p>
          </figcaption>
        </figure>
      </main>
    </>
  );
}
