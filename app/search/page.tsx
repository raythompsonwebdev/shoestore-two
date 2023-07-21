import React from 'react';
import LikesSection from "../components/LikesSection";
import Image from "next/image";
import getProducts from '../../lib/getProducts'
import {Product} from "../../types/index"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchProduct(props:Props) {

  const data : Product[] = await getProducts()

  const searchParams  = props.searchParams;

  const genderParam = searchParams.genderVal;
  const styleParam = searchParams.styleVal;
  const sizeParam = searchParams.sizeVal;
  const colorParam = searchParams.colorVal;

  //filter product from the products array
  const product = data.filter(
    (product: any) =>
      product.size === sizeParam ||
      product.color === colorParam ||
      product.gender === genderParam ||
      product.style === styleParam ? product: false
  );

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

                <LikesSection
                  productName={shoes.name}
                />
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
