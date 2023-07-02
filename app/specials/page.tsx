/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { SetStateAction, useState,useEffect } from "react";
import SpecialsProductBoxes from "../components/specials/specialsProductBoxes";
import AccordianMenu from "../components/accordianMenu";
import SearchBar from "../components/searchBar/SearchBar";
import SearchSelect from "../components/searchSelect/SearchSelect";
import "bootstrap/dist/css/bootstrap.min.css";


export default async function Specials() {


  const [productData, setProductData] = useState<Array<any>>([]);
  const [accordianData, setAccordiantData] = useState<Array<any>>([]);
  const [searchBarData, setSearchBarData] = useState<Array<any>>([])
  const [selectBarData, setSelectData] = useState<Array<any>>([]);
  const [OrderDir, setOrderByDir] = useState<string>("asc");
  const [OrderByVal, setOrderByVal] = useState<string>("all");
  const [visibility, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/allproductsdata");
      const json = await res.json();
      if (json) {
        setProductData(json.product);
        setAccordiantData(json.accordian)
        setSearchBarData(json.searchresults)
        setSelectData(json.selectresults)
      }
    };
    fetchData();
  }, []);

  const handleChange = (selected: SetStateAction<string>) => {
    setOrderByVal(selected);
    setOrderByDir("asc");
  };

  const sidebarVisibility = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  const changesOrders = (
    orderbyval: SetStateAction<string>,
    dir: SetStateAction<string>
  ) => {
    setOrderByVal(orderbyval);
    setOrderByDir(dir);
  };

  let filteredApts = productData;

  const value = OrderByVal;

  filteredApts = filteredApts.filter(
    (item: {
      [x: string]: any;
      color: string;
      style: string;
      size: string;
      gender: string;
      price: string;
    }) => {
      if (
        item.color === value ||
        item.style === value ||
        item.size === value ||
        item.gender === value ||
        item.price === value
      ) {
        return item;
      }

      return item[value];
    }
  );

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="Specials" searchBarData={searchBarData} />

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
          <AccordianMenu accordianData={accordianData} />
        </aside>

        <section id="right-content-section" role="main">
          <SearchSelect
              orderByVal={OrderByVal}
              orderDir={OrderDir}
              changesOrders={changesOrders}
              handleChange={handleChange}
              selectBarData={selectBarData}
            />
          <br />

          <SpecialsProductBoxes productData={filteredApts} />

          <br />
        </section>
      </main>
    </>
  );
}
