"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "../../features/store";
import Basket from "../../components/Basket";
import { selectAllCartItems, addToCart } from "../../features/cart/cartSlice";
import { getServerSession } from "next-auth/next";

const Cart = () => {
  const { cartItems } = useSelector(selectAllCartItems);

  const { data: session, status } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = { ...session };

  useEffect(() => {
    if (status === "authenticated") {
      try {
        const addData = async () => {
          const res = await fetch("/api/addcartitems", {
            method: "POST",
            body: JSON.stringify({ cartItems, user }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await res.json();
          console.log(result);

          //return result;
        };

        addData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [status, cartItems, user]);

  if (status === "authenticated" && user !== null) {
    return (
      <>
        <main id="main-content" className="clearfix">
          <h1 id="main-content-title">Cart - Logged In</h1>
          <p>{user ? user.name : "name not available"}</p>
          <p>{user ? user.email : "email not available"}</p>
          <Basket cartItems={cartItems}></Basket>
        </main>
      </>
    );
  } else {
    return (
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Cart - Not Logged In</h1>
        <Basket cartItems={cartItems}></Basket>
      </main>
    );
  }
};

export default Cart;
