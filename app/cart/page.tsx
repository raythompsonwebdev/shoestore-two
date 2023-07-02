import { getServerSession } from "next-auth/next";
import { authOptions } from "../options";
// import { useState } from 'react';
// import Basket from './components/Basket';
// import Image from "next/image";

const myComponentStyle = {
  width: "600px",
  height: "600px",
  backgroundColor: "red",
  display: "block",
  margin: "50px",
};

// const { products } = data;
// const [cartItems, setCartItems] = useState([]);
// const onAdd = (product) => {
//   const exist = cartItems.find((x) => x.id === product.id);
//   if (exist) {
//     setCartItems(
//       cartItems.map((x) =>
//         x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
//       )
//     );
//   } else {
//     setCartItems([...cartItems, { ...product, qty: 1 }]);
//   }
// };
// const onRemove = (product) => {
//   const exist = cartItems.find((x) => x.id === product.id);
//   if (exist.qty === 1) {
//     setCartItems(cartItems.filter((x) => x.id !== product.id));
//   } else {
//     setCartItems(
//       cartItems.map((x) =>
//         x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
//       )
//     );
//   }
// };

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


