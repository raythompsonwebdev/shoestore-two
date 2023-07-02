'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import BannerImg from "./components/homepage/bannerImg";
import HomePageBoxes from './components/homepage/homepageBoxes'
import AccordianMenu from './components/accordianMenu'
import FindShoes from './components/homepage/FindShoes'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Home() {

  const [accordianData, setAccordiantData] = useState<Array<any>>([])
  const [productData, setProductData] = useState<Array<any>>([])
  const [visibility, setVisibility] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/newproductsdata");
      const json = await res.json();
      if (json) {
        setProductData(json.product);
        setAccordiantData(json.accordian)
      }
    };
    fetchData();
  }, []);

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
          // className={`left-side-content`}
        >
          <FindShoes />
            <AccordianMenu accordianData={accordianData} />
        </aside>

        <section id="right-content-section" className="group">
          <BannerImg />

          <h1 id="right-content-section-header">Featured</h1>
          <HomePageBoxes productData={productData} />
        </section>
      </main>
    </>
  );
}
