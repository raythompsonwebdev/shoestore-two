"use client";
import React, { useState } from "react";
import LikesSection from "../../../components/LikesSection";
import { useSelector, useDispatch } from "../../../features/store";
import { selectProductByName } from "../../../features/products/productSlice";
import { addToCart } from "../../../features/cart/cartSlice";
import ProductImage from "../../../components/Images/ProductImage";
import { CartIcon } from "../../../components/Images/Icons";
import { formatPrice } from "../../../helpers/index";
import { ProductType } from "../../../types";

const SingleProduct = ({ params }: any) => {
  const dispatch = useDispatch();

  const { prodname } = params;

  const singleProd = useSelector(
    (state) => selectProductByName(state, prodname) as ProductType
  );

  const {
    color,
    gender,
    imgUrl,
    likes,
    name,
    price,
    prodId,
    qty,
    size,
    style,
    text,
    _id,
  } = { ...singleProd };

  const [productInfo, setProductInfo] = useState({ likes: likes });

  return singleProd ? (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Shoes</h1>
        <figure id="product-page-box">
          <ProductImage
            src={`${imgUrl}`}
            alt={`${style}`}
            cname={"product-page-img"}
          />
          <figcaption id="product-page-caption">
            <p className="product-page-title"> {name}</p>
            <p id="product-page-price">Price :{formatPrice(price)}</p>
            <p className="product-page-title">Gender : {gender}</p>
            <p className="product-page-title">Size : {size}</p>
            <p className="product-page-title">Color : {color}</p>
            <p className="product-page-title">Prod SKU : {prodId}</p>
            <p className="product-page-title">{text}</p>

            <LikesSection
              likes={productInfo.likes}
              productName={prodname}
              setProductInfo={setProductInfo}
              prodid={_id}
            />

            <div id="addtocart-section">
              <button
                type="submit"
                onClick={() => dispatch(addToCart(singleProd))}
                className="addtocart-section-btn"
              >
                <CartIcon />
              </button>

              <p className="addtocart-section-text">Add to Cart</p>
            </div>
          </figcaption>
        </figure>
      </main>
    </>
  ) : (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Single Product</h1>
        <figure id="product-page-box">
          <figcaption id="product-page-caption">
            <p className="product-page-title">Product not found!</p>
          </figcaption>
        </figure>
      </main>
    </>
  );
};

export default SingleProduct;
