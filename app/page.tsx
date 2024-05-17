"use client";
import React, { useState, Suspense, useEffect } from "react";
import BannerImg from "../components/homepage/bannerImg";
import HomePageBoxes from "../components/homepage/homepageBoxes";
import FindShoes from "../components/homepage/FindShoes";
import AccordianMenu from "../components/accordianMenu";
import {
  selectAllAccordian,
  fetchAccordian,
  getAccordianStatus,
} from "../features/accordian/accordianSlice";
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from "../features/products/productSlice";
import { useSelector, useDispatch } from "../features/store";

export default function Home() {
  const dispatch = useDispatch();
  // get Products
  const productItems = useSelector(selectAllProducts);
  const productItemsStatus = useSelector(getProductsStatus);

  // acoordian data
  const accordianItems = useSelector(selectAllAccordian);
  const accordianDataStatus = useSelector(getAccordianStatus);

  useEffect(() => {
    if (productItemsStatus === "idle") {
      dispatch(fetchProducts());
    }
    // dispatch(productAdded);
  }, [productItemsStatus, dispatch]);

  useEffect(() => {
    if (accordianDataStatus === "idle") {
      dispatch(fetchAccordian());
    }
  }, [accordianDataStatus, dispatch]);

  const [visibility, setVisibility] = useState<boolean>(false);

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

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
          className={`left-side-content ${visibility ? "is-expanded" : " "}`}
        >
          <FindShoes />
          <AccordianMenu accordianData={accordianItems} />
        </aside>

        <section id="right-content-section" className="group">
          <BannerImg />

          <h1 id="right-content-section-header">Featured</h1>
          <Suspense fallback="Loading......">
            <HomePageBoxes productData={productItems} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
