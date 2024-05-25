"use client";
import { useState, useEffect } from "react";
import NewProductBoxes from "../../components/newProduct/newProductBoxes";
import SearchBar from "../../components/searchBar/SearchBar";
import AccordianMenu from "../../components/accordianMenu";
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from "../../features/products/productSlice";

import { useSelector, useDispatch } from "../../features/store";
import { ProductType } from "../../types";

export default function NewProducts() {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState<ProductType[]>([]);

  const productItems = useSelector(selectAllProducts);
  const productItemsStatus = useSelector(getProductsStatus);
  //const productItemsError = useAppSelector(getProductsError);

  useEffect(() => {
    if (productItemsStatus === "idle") {
      dispatch(fetchProducts());
    }
    setProductData(productItems);
  }, [productItemsStatus, productItems, dispatch]);

  const [visibility, setVisibility] = useState<boolean>(false);

  const sidebarVisibility = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="New Products" />
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
          <AccordianMenu />
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
