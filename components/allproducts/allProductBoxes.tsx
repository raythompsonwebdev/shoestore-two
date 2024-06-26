import React from "react";
import ProductBox from "./allProductBox";
import { ProductType } from "../../types/index";

const ProductBoxes = (props: { productData: ProductType[] }) => {
  const { productData } = props;

  const Product = productData
    .slice(0, 16)
    .map((item) => (
      <ProductBox
        key={item._id}
        name={item.name}
        imgUrl={item.imgUrl}
        price={item.price}
        cartImg={item.cartImg}
        style={item.style}
      />
    ));

  return <div className="product-boxes">{Product}</div>;
};

export default ProductBoxes;
