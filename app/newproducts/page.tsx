'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useState,useEffect } from "react";
import NewProductBoxes from "../components/newProduct/newProductBoxes";
import AccordianMenu from "../components/accordianMenu";
import SearchBar from "../components/searchBar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

type NewProductsData = {
  product: [];
  accordian: [];
  searchresults :[];
}

export default function NewProducts() {

  const [productData, setProductData] = useState<[]>([]);
  const [accordianData, setAccordiantData] = useState<[]>([]);
  const [searchbarData, setSearchBarData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/newproductsdata");
      const json : NewProductsData = await res.json();
      if (json) {
        setProductData(json.product);
        setAccordiantData(json.accordian)
        setSearchBarData(json.searchresults)
      }
    };
    fetchData();
  }, []);

  const [visibility, setVisibility] = useState<boolean>(false);

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="New Products" searchBarData={searchbarData} />

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
          // className={`left-side-content}`}
        >
          <AccordianMenu accordianData={accordianData} />
        </aside>

        <section id="right-content-section">
          <NewProductBoxes productData={productData} />

          <br />
          <br />
        </section>
      </main>
    </>
  );
}

