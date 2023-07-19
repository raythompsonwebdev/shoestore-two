import React from 'react';
import SearchBar from "../components/searchBar/SearchBar";
import SideBar from '../components/sideBar/sideBar'
import AllProducts from '../components/allproducts/allProducts'

export const metadata = {
  title: 'All Products',
  description: 'see all our productss',
}

export default function Allproducts() {

  return (

    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="All Products" />
        <SideBar />

        <main id="right-content-section" className="group">

        < AllProducts />

        </main>
      </main>
    </>

  );
}
