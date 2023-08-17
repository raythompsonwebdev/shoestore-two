"use client"
import React, { Key } from 'react'
import NewProductBox from './newProductBox'
import { Product } from '../../types/index'

const newProductBoxes = (props: { productData: Product[] }) => {
  const { productData } = { ...props }

  const NewProduct = productData
    .slice(0, 6)
    .map(
      (item: {
        _id: Key | null | undefined
        name: string
        imgUrl: string
        price: number
        cartImg: string
        style: string
        text: string
      }) => (
        <NewProductBox
          key={item._id}
          cartImg={item.cartImg}
          imgUrl={item.imgUrl}
          name={item.name}
          price={item.price}
          text={item.text}
        />
      )
    )

  return <div className="larger-product-boxes">{NewProduct}</div>
}

export default newProductBoxes

