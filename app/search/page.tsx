'use client';
import React from 'react';
// import { useState } from "react";
// import LikesSection from "../components/LikesSection";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import useSWR from "swr";


export default function SearchProduct() {

  const searchParams = useSearchParams()

  const genderParam = searchParams.get('genderVal');
  const styleParam = searchParams.get('styleVal');
  const sizeParam = searchParams.get('sizerVal');
  const colorParam = searchParams.get('colorVal');

  console.log(searchParams);

  const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR(
    `/api/searchdata`,
    fetcher
  );

  if (error) return <div>Failed to fetch users.</div>
    if (isLoading) return <h2>Loading...</h2>

  // const [products] = useState(productsearch);
  //const [productInfo, setProductInfo] = useState({ likes: 0 });

  // filter product from the products array
  const product = data.filter(
    (product: any) =>
      product.size === sizeParam ||
      product.color === colorParam ||
      product.gender === genderParam ||
      product.style === styleParam ? product: false
  );

//const product = null; // placeholder

  return product ? (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Search Products page</h1>
        {product.map((shoes: any) => (
            <figure id="product-page-box" key={shoes.prodId}>
              <Image
                id="product-page-img"
                src={shoes.imgUrl}
                alt={"test"}
                width={175}
                height={150}
              />
              <figcaption id="product-page-caption">
                <p className="product-page-title"> {shoes.name}</p>
                <p id="product -page-price">£{shoes.price}</p>
                <p className="product-page-title">{shoes.gender}</p>
                <p className="product-page-title">{shoes.size}</p>
                <p className="product-page-title">{shoes.color}</p>
                <p>{""}</p>

                {/* <LikesSection
                  likes={productInfo.likes}
                  productName={shoes.name}
                  setProductInfo={setProductInfo}
                /> */}
              </figcaption>
            </figure>
          ))}
      </main>
    </>
  ) : (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Search Products page</h1>
        <figure id="product-page-box">
          <figcaption id="product-page-caption">
            <p className="product-page-title">No Products Found</p>
          </figcaption>
        </figure>
      </main>
    </>
  );
}
