/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { SetStateAction, useEffect, useState } from "react";
import AllProductBoxes from "../components/allproducts/allProductBoxes";
import AccordianMenu from "../components/accordianMenu";
import SearchBar from "../components/searchBar/SearchBar";
import SearchSelect from "../components/searchSelect/SearchSelect";
import {FilteredData , AllData} from "../../types/index"
import "bootstrap/dist/css/bootstrap.min.css";


export default function Allproducts() {

  const [accordianData, setAccordiantData] = useState<[]>([]);
  const [productData, setProductData] = useState<Array<FilteredData>>([]);
  const [searchbarData, setSearchBarData] = useState<[]>([]);
  const [selectbarData, setSelectData] = useState<[]>([]);
  const [orderDir, setOrderByDir] = useState<string>("asc");
  const [OrderByVal, setOrderByVal] = useState<string>("all");
  const [visibility, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/allproductsdata");
      const json :AllData = await res.json();
      if (json) {
        setProductData(json.product);
        setAccordiantData(json.accordian)
        setSearchBarData(json.searchresults)
        setSelectData(json.selectresults)
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedSize: SetStateAction<string>) => {
    setOrderByVal(selectedSize);
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
    (item) => {
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
        <SearchBar labelname="All Products" searchBarData={searchbarData} />

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

        <main id="right-content-section" className="group">
          <SearchSelect
              orderByVal={OrderByVal}
              orderDir={orderDir}
              changesOrders={changesOrders}
              handleChange={handleChange}
              selectBarData={selectbarData}
            />
          <AllProductBoxes productData={filteredApts} />
        </main>
      </main>
    </>

  );
}
