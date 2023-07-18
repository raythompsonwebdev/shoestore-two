'use client';
import React from 'react';
import useSWR from "swr";
import Image from "next/image";
import LikesSection from "../components/LikesSection";

export default function SingleProduct({params}:any) {

  console.log(params.prodname)

  // const [singleProduct] = useState(product);

  const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR(
    `/api/singleproduct`,
    fetcher
  );

  if (error) return  (
                      <>
                        <main id="main-content" className="clearfix">
                          <h1 id="main-content-title">Product Not Found</h1>
                          <figure id="product-page-box">
                            <figcaption id="product-page-caption">
                              <p className="product-page-title">Product Not Found</p>
                            </figcaption>
                          </figure>
                        </main>
                      </>
                    );

  if (isLoading) return <>
                          <main id="main-content" className="clearfix">
                            <h1 id="main-content-title">Loading ....</h1>
                            <figure id="product-page-box">
                              <figcaption id="product-page-caption">
                                <p className="product-page-title">Loading ...</p>
                              </figcaption>
                            </figure>
                          </main>
                        </>


  // const { _id, color, imgUrl, name, price, size, style, text }: any = {
  //   ...singleProduct,
  // };

 const singleProduct = data.filter((prod:{name:string}) => prod.name === params.prodname ? prod : false)

 const [result] = [...singleProduct];

  return result.name === params.prodname && (
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

              <LikesSection
                // likes={productInfo.likes}
                // productName={prodname}
                // setProductInfo={setProductInfo}
                //prodid={_id}
              />

              {/* <button onClick={() => onAdd(product)}>Add To Cart</button> */}
            </figcaption>
        </figure>
      </main>
    </>
  );
}
