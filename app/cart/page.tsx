import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
// import Basket from './components/Basket';

const myComponentStyle = {
  width: "600px",
  height: "600px",
  backgroundColor: "red",
  display: "block",
  margin: "50px",
};


export default async function Cart() {

  const session = await getServerSession(authOptions);

  if (session) {
  return (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Cart - logged in</h1>
        <section style={myComponentStyle}></section>
        {/* <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            ></Basket> */}
      </main>
    </>
  );
  } else {
    return (
        <>
          <main id="main-content" className="clearfix">
            <h1 id="main-content-title">Cart - not logged in</h1>
            <section style={myComponentStyle}></section>
          </main>
        </>
    );
  }
}


