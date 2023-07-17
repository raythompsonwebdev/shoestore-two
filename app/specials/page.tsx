import React from 'react';
import SearchBar from "../components/searchBar/SearchBar";
import SideBar from '../components/sideBar/sideBar'
import SpecialsProducts from "../components/specials/specialsProduct";


export default async function Specials() {

  return (
    <>
      <main id="main-content" className="clearfix">

        <SearchBar labelname="Specials" />

        <SideBar />

        <section id="right-content-section" role="main">
          <SpecialsProducts />

          <br />
        </section>
      </main>
    </>
  );
}
