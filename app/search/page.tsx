"use client"
import React from 'react';
import ProductImage from '../../components/Images/ProductImage'
import Link from 'next/link'
import { Product } from '../../types/index'
import { useAppSelector } from '../../app/store'
import { selectAllProducts } from '../../features/products/productSlice'
import { formatPrice } from '../../helpers/index'
import { useSearchParams} from 'next/navigation'
import CartIcon from '../../components/Images/CartIcon'

const SearchProduct = () => {

  const searchParams = useSearchParams()

  const colorVal = searchParams.get('colorVal');
  const sizeVal = searchParams.get('sizeVal');
  const genderVal = searchParams.get('genderVal');
  const styleVal = searchParams.get('styleVal');

  const searchProducts = useAppSelector(selectAllProducts)

  //filter product from the products array
  const products = searchProducts.filter((product: Product) =>
    product.gender === genderVal ||
    product.style === styleVal ||
    product.size === sizeVal ||
    product.color === colorVal
      ? product
      : false
  )

  return !products ? (
    <>
        <main id="main-content" className="clearfix">
          <h1 id="main-content-title">Search Products page</h1>
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
          <h1 id="main-content-title">Single Product Search</h1>
          {products.map((shoes: Product) => (
            <figure id="product-page-box" key={shoes.prodId}>
              <ProductImage src={shoes.imgUrl} alt={'test'} cname={'product-page-img'} />
              <figcaption id="product-page-caption">

                <p className="product-page-title"> {shoes.name}</p>
                <p id="product -page-price">{formatPrice(shoes.price)}</p>
                <p className="product-page-title">{shoes.gender}</p>
                <p className="product-page-title">{shoes.size}</p>
                <p className="product-page-title">{shoes.color}</p>
                <p className="product-page-title">
                  <Link href={`/product/${shoes.name}`} className="product-box-icon-link">
                  <CartIcon src={shoes.cartImg} alt={"shopping-cart icon"} cname={"product-box-icon-link"}/>
                      </Link></p>
              </figcaption>
            </figure>
          ))}
        </main>
    </>
  )
}

export default SearchProduct
