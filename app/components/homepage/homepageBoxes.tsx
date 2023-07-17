"use client";
import React, { Key } from "react";
import HomePageBox from "./homePageBox";
import  useSWR  from 'swr';

const fetcher = (url:string) => fetch(url).then((res) => res.json());

// export default function HomePageBoxes(props: { productData: Array<any> }) {
  export default function HomePageBoxes() {

  const { data , error, isLoading } = useSWR(
    "/api/productsdata",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";


 const { product } =  data ;


  // const { productData } = { ...props };

  const NewProduct = product
    .slice(0, 8)
    .map(
      (item: {
        _id: Key | null | undefined;
        name: string;
        imgUrl: string;
        price: string;
        cartImg: string;
        style: string;
      }) => (
        <HomePageBox
          key={item._id}
          name={item.name}
          imgUrl={item.imgUrl}
          price={item.price}
          cartImg={item.cartImg}
          style={item.style}
        />
      )
    );

  return <div className="product-boxes">{NewProduct}</div>;
}
