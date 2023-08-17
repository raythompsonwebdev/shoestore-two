"use client"
import React, { useState } from 'react'
import BannerImg from "../components/homepage/bannerImg";
import HomePageBoxes from '../components/homepage/homepageBoxes'
import FindShoes from '../components/homepage/FindShoes'
import AccordianMenu from '../components/accordianMenu'
// import getProducts from '../lib/getProducts'
import {
  selectAllAccordian,
  fetchAccordian,
  getAccordianStatus,
} from '../features/accordian/accordianSlice'
import {
  productAdded,
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from '../features/products/productSlice'
import { useAppSelector, useAppDispatch } from '../app/store'
import { useEffect } from 'react'

// export const metadata = {
//   title: 'Shoestore Home',
//   description: 'latest shoes',
// }

export default function Home() {

  /** API slice */
  // const {
  //   data :product
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetProductsQuery()

const dispatch = useAppDispatch()
  // get Products
  const productItems = useAppSelector(selectAllProducts)
  const productItemsStatus = useAppSelector(getProductsStatus)
  //const productItemsError = useAppSelector(getProductsError);

  // acoordian data
  const accordianItems = useAppSelector(selectAllAccordian)
  const accordianDataStatus = useAppSelector(getAccordianStatus)
  //const accordianDataError = useAppSelector(getAccordianError);

  useEffect(() => {
    if (productItemsStatus === 'idle') {
      dispatch(fetchProducts())
    }
    dispatch(productAdded)
  }, [productItemsStatus, dispatch])

  useEffect(() => {
    if (accordianDataStatus === 'idle') {
      dispatch(fetchAccordian())
    }
  }, [accordianDataStatus, dispatch])

  console.log(productItems,accordianItems )

  const [visibility, setVisibility] = useState<boolean>(false)

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setVisibility(!visibility)
  }

  return (
    <>
      <main id="main-content" className="clearfix">
          <button
            id="sidebar-toggle-btn"
            type="button"
            onClick={sidebarVisibility}
            aria-label="secondary menu toggle button"
          >
            SIDE
          </button>

          <aside
            className={`left-side-content ${visibility ? 'is-expanded' : ' '}`}
          >
            <FindShoes />
            <AccordianMenu accordianData={accordianItems} />
          </aside>

          <section id="right-content-section" className="group">
            <BannerImg />

            <h1 id="right-content-section-header">Featured</h1>
            <HomePageBoxes productData={productItems} />
          </section>
        </main>
    </>
  );
}
