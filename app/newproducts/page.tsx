"use client";
import { useState, Suspense, useEffect } from "react";
import NewProductBoxes from "../../components/newProduct/newProductBoxes";
import SearchBar from "../../components/searchBar/SearchBar";
import AccordianMenu from "../../components/accordianMenu";
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from "../../features/products/productSlice";
import {
  selectAllAccordian,
  fetchAccordian,
  getAccordianStatus,
} from "../../features/accordian/accordianSlice";
import {
  getSearchData,
  fetchSearchData,
  getSearchBarStatus,
} from "../../features/searchdata/searchdataSlice";
import { useSelector, useDispatch } from "../../features/store";
import { ProductType } from "../../types";

export default function NewProducts() {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState<ProductType[]>([]);
  // get Products
  const productItems = useSelector(selectAllProducts);
  const productItemsStatus = useSelector(getProductsStatus);
  //const productItemsError = useAppSelector(getProductsError);

  // acoordian data
  const accordianItems = useSelector(selectAllAccordian);
  const accordianDataStatus = useSelector(getAccordianStatus);
  //const accordianDataError = useAppSelector(getAccordianError);

  // searchbar data
  const searchbarItems = useSelector(getSearchData);
  const searchbarDataStatus = useSelector(getSearchBarStatus);
  //const searchbarDataError = useAppSelector(getAccordianError);

  useEffect(() => {
    if (productItemsStatus === "idle") {
      dispatch(fetchProducts());
    }
    setProductData(productItems);
  }, [productItemsStatus, productItems, dispatch]);

  useEffect(() => {
    if (accordianDataStatus === "idle") {
      dispatch(fetchAccordian());
    }
  }, [accordianDataStatus, dispatch]);

  useEffect(() => {
    if (searchbarDataStatus === "idle") {
      dispatch(fetchSearchData());
    }
  }, [searchbarDataStatus, dispatch]);

  const [visibility, setVisibility] = useState<boolean>(false);

  const sidebarVisibility = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <>
      <main id="main-content" className="clearfix">
        <Suspense fallback="Loading......">
          <SearchBar labelname="New Products" searchData={searchbarItems} />
        </Suspense>

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
          <AccordianMenu accordianData={accordianItems} />
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
