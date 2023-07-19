import React from 'react';
import BannerImg from "./components/homepage/bannerImg";
import HomePageBoxes from './components/homepage/homepageBoxes'
import SideBar from './components/sideBar/sideBar'
import getProducts from '../lib/getProducts'
import {Product} from "../types/index"

export default async function Home() {

  const data : Product[] = await getProducts()

  return (
    <>
      <main id="main-content" className="clearfix">

          <SideBar />

        <section id="right-content-section" className="group">
          <BannerImg />

          <h1 id="right-content-section-header">Featured</h1>

          <HomePageBoxes productData={data} />
        </section>
      </main>
    </>
  );
}
