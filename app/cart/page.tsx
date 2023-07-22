'use client';
import React, { useState, useEffect } from 'react';
//import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react"
import Main from './Main';
import Basket from '../components/Basket';
import { AllData} from "../../types/index"


export default function Cart() {

  const [products, setProductData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/allproductsdata");
      const json :AllData = await res.json();
      if (json) {
        setProductData(json.product);
      }
    };
    fetchData();
  }, []);

  console.log(products)

  //const  product  = data.product;
  // const products = {}
  //const session = await getServerSession(authOptions);
  const { data: session, status } = useSession()

  const [cartItems, setCartItems] = useState<any>([]);

  const onAdd = (product:any) => {

    const exist: any = cartItems.find((x :{id:any}) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x:any) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product :any) => {
    const exist = cartItems.find((x:any) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x:any) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x:any) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  if (status === "authenticated" || session) {
  return (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Cart - logged in</h1>
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
            ></Basket>
      </main>
    </>
  );
  } else {
    return (
        <>
          <main id="main-content" className="clearfix">
            <h1 id="main-content-title">Cart - not logged in</h1>
            <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
            ></Basket>
          </main>
        </>
    );
  }
}


