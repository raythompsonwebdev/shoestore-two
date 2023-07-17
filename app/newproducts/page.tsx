import React from 'react';
import NewProductBoxes from "../components/newProduct/newProductBoxes";
import SearchBar from "../components/searchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from '../components/sideBar/sideBar'

export default function NewProducts() {

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="New Products"/>

          <SideBar />

        <section id="right-content-section">

          <NewProductBoxes />

          <br />
          <br />
        </section>
      </main>
    </>
  );
}

