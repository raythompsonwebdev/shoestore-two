"use client";
import React from "react";
import ProductImage from "../../components/Images/ProductImage";
import Link from "next/link";
import { ProductType } from "../../types/index";
import { useSelector } from "../../features/store";
import { selectAllProducts } from "../../features/products/productSlice";
import { formatPrice } from "../../helpers/index";
import { useSearchParams } from "next/navigation";
import CartIcon from "../../components/Images/CartIcon";

const SearchProduct = () => {
  const searchParams = useSearchParams();

  const colorVal = searchParams.get("colorVal");
  const sizeVal = searchParams.get("sizeVal");
  const genderVal = searchParams.get("genderVal");
  const styleVal = searchParams.get("styleVal");

  const searchProducts = useSelector(selectAllProducts);

  //filter product from the products array using chaining
  const products = searchProducts
    .filter((prodgen: ProductType) => prodgen.gender === genderVal)
    .filter((prodstyle) => prodstyle.style === styleVal)
    .filter((prodsize) => prodsize.size === sizeVal)
    .filter((prodcol) => prodcol.color === colorVal);

  return products.length === 0 ? (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Search Products Page</h1>
        <figure id="product-page-box">
          <figcaption id="product-page-caption">
            <p className="product-page-title">Sorry! No Products Found</p>
          </figcaption>
        </figure>
      </main>
    </>
  ) : (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Search Results</h1>
        {products.map((shoes: ProductType) => (
          <figure id="product-page-box" key={shoes.prodId}>
            <ProductImage
              src={shoes.imgUrl}
              alt={"test"}
              cname={"product-page-img"}
            />
            <figcaption id="product-page-caption">
              <p className="product-page-title"> {shoes.name}</p>
              <p id="product -page-price">{formatPrice(shoes.price)}</p>
              <p className="product-page-title">{shoes.gender}</p>
              <p className="product-page-title">{shoes.size}</p>
              <p className="product-page-title">{shoes.color}</p>

              <Link
                href={`/shoes/${shoes.name}`}
                className="product-box-icon-link"
              >
                <CartIcon
                  src={shoes.cartImg}
                  alt={"shopping-cart icon"}
                  cname={"product-box-icon-link"}
                />
              </Link>
            </figcaption>
          </figure>
        ))}
      </main>
    </>
  );
};

export default SearchProduct;
