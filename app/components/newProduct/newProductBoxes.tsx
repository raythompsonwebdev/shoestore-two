"use client";
import React, { Key } from "react";
import NewProductBox from "./newProductBox";
import  useSWR  from 'swr';

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export default function NewProductBoxes() {

  const { data , error, isLoading } = useSWR(
    "/api/productsdata",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

 const { product } =  data ;

  const NewProduct = product
    .slice(0, 6)
    .map(
      (item: {
        _id: Key | null | undefined;
        name: string;
        imgUrl: string;
        price: string;
        cartImg: string;
        text: string;
      }) => (
        <NewProductBox
          key={item._id}
          name={item.name}
          imgUrl={item.imgUrl}
          price={item.price}
          cartImg={item.cartImg}
          text={item.text}
        />
      )
    );

  return <div className="larger-product-boxes">{NewProduct}</div>;
}
