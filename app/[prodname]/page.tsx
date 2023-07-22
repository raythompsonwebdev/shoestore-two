import React from 'react';
import Image from "next/image";
import LikesSection from "../components/LikesSection";
import getProducts from '../../lib/getProducts'
import getSingleProduct from '../../lib/getSingleProduct'
import {Product} from "../../types/index"
import type { Metadata } from 'next'

type Params = {
  params: {
      prodname : string
  }
}

export async function generateMetadata({ params: { prodname } }: Params): Promise<Metadata> {
  const productData: Promise<Product> = getSingleProduct(prodname)
  const product = await productData

  console.log(product)

  if (!product) {
      return {
          title: "User Not Found"
      }
  }

  return {
      title: product.name,
      description: `This is the page of ${product.name}`
  }

}

export default async function SingleProduct({params}: Params) {

const singledata : Product = await getSingleProduct(params.prodname)

  return singledata.name === params.prodname && (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Product Page</h1>
        <figure id="product-page-box">
          <Image
              id="product-page-img"
              src={singledata.imgUrl}
              alt={singledata.style}
              width={175}
              height={150}
            />
          <figcaption id="product-page-caption">
              <p className="product-page-title"> {singledata.name}</p>
              <p id="product-page-price">£{singledata.price}</p>
              <p className="product-page-title">Size : {singledata.size}</p>
              <p className="product-page-title">Color : {singledata.color}</p>
              <p>{singledata.text}</p>

              <LikesSection
                productName={singledata.name}
              />

              {/* <button onClick={() => onAdd(product)}>Add To Cart</button> */}
            </figcaption>
        </figure>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const productData: Promise<Product[]> = getProducts()
  const products = await productData

  return products.map(product => ({
      productId: product.prodId.toString()
  }))
}
