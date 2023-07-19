import React from 'react';
import NewProductBoxes from "../components/newProduct/newProductBoxes";
import SearchBar from "../components/searchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from '../components/sideBar/sideBar'
import getProducts from '../../lib/getProducts'
import {Product} from "../../types/index"

export default async function NewProducts() {

  const data : [] = await getProducts()

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="New Products"/>

          <SideBar />

        <section id="right-content-section">

          <NewProductBoxes productData={data}/>

          <br />
          <br />
        </section>
      </main>
    </>
  );
}

