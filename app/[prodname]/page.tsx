"use client"
import React, { useState } from 'react'
import LikesSection from '../../components/LikesSection'
// import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppSelector } from '../../app/store'
import { selectProductByName } from '../../features/products/productSlice'
import ProductImage from '../../components/Images/ProductImage'
//import CartIcon from '../Images/CartIcon'
import { formatPrice } from '../../helpers/index'
// import { Product } from '../../types/index'

const SingleProduct = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // const [cartItems, setCartItems] = useState<Product[]>([])

  // const singleProd = useAppSelector(selectAllProducts)

  const params = useParams();
  const {prodname } = params;

  console.log(prodname)

 const singleProd = useAppSelector((state) => selectProductByName(state, prodname))

 console.log(singleProd)

 //const result = singleProd.find((product) => product.name === prodname)

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
  } = { ...singleProd }

  console.log(qty, style)

  const [productInfo, setProductInfo] = useState<{ likes: number | undefined }>(
    { likes: likes }
  )

  // useEffect(() => {
  //   if (window.localStorage) {
  //     localStorage.setItem('cart', JSON.stringify(cartItems))
  //   }
  // }, [cartItems])
  // }, [])

  // const onAdd = (product: Product) => {
  //   const exist = cartItems.find(
  //     (x: { prodId: number }) => x.prodId === product.prodId
  //   )

  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.prodId === product.prodId ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     )
  //   } else {
  //     setCartItems([...cartItems, { ...product, qty: 1 }])
  //   }
  // }

  return singleProd ? (

    <>
        <main id="main-content" className="clearfix">
          <h1 id="main-content-title">Product Page</h1>
          <figure id="product-page-box">
            {/* <Image
              id="product-page-img"
              src={imgUrl || ' '}
              alt={style || ' '}
              width={175}
              height={150}
            /> */}
            <ProductImage src={imgUrl || ''} alt={name || 'Default Image'} cname={'product-page-img'} />
            <figcaption id="product-page-caption">
              <p className="product-page-title"> {name}</p>
              <p id="product-page-price">{formatPrice(price || 0)}</p>
              <p className="product-page-title">Gender : {gender}</p>
              <p className="product-page-title">Size : {size}</p>
              <p className="product-page-title">Color : {color}</p>
              <p className="product-page-title">Prod SKU : {prodId}</p>
              <p>{text}</p>

              <LikesSection
                likes={productInfo.likes || 0}
                productName={prodname}
                setProductInfo={setProductInfo}
                prodid={_id}
              />

              <div id="addtocart-section">
                <button
                  type="submit"
                  // onClick={() => onAdd(result)}
                  className="addtocart-section-btn"
                >
                  Add To Cart
                </button>

                <p className="addtocart-section-text">
                  Click here to add shoes to shopping cart!
                </p>
              </div>
            </figcaption>
          </figure>
        </main>
    </>
  ) : (

      <>
        <main id="main-content" className="clearfix">
          <h1 id="main-content-title">New Product Page</h1>
          <figure id="product-page-box">
            <figcaption id="product-page-caption">
              <p className="product-page-title">product not found</p>
            </figcaption>
          </figure>
        </main>
      </>

  )
}

export default SingleProduct
