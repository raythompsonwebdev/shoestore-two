import React from 'react';
import Image from "next/image";
import LikesSection from "../components/LikesSection";
import getProducts from '../../lib/getProducts'
import {Product} from "../../types/index"

export default async function SingleProduct({params}:any) {

const data : Product[] = await getProducts()

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
                productName={result.name}
              />

              {/* <button onClick={() => onAdd(product)}>Add To Cart</button> */}
            </figcaption>
        </figure>
      </main>
    </>
  );
}
