"use client";
import { SetStateAction, useState, useEffect } from "react";
import AllProductBoxes from "../../components/allproducts/allProductBoxes";
import AccordianMenu from "../../components/accordianMenu";
import SearchBar from "../../components/searchBar/SearchBar";
import SearchSelect from "../../components/searchSelect/SearchSelect";
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from "../../features/products/productSlice";
import { useSelector, useDispatch } from "../../features/store";

const Allproducts = () => {
  const [orderDir, setOrderByDir] = useState<string>("asc");
  const [OrderByVal, setOrderByVal] = useState<string>("all");
  const [visibility, setVisibility] = useState<boolean>(false);

  const dispatch = useDispatch();

  const productData = useSelector(selectAllProducts);
  const productItemsStatus = useSelector(getProductsStatus);
  //const productItemsError = useAppSelector(getProductsError);

  useEffect(() => {
    if (productItemsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productItemsStatus, dispatch]);

  const handleChange = (selectedSize: SetStateAction<string>): void => {
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

  filteredApts = filteredApts.filter((item) => {
    if (
      item.color === value ||
      item.style === value ||
      item.size === value ||
      item.gender === value
    ) {
      return item;
    }
    return item[value];
  });

  return (
    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="All Products" />

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

        <main id="right-content-section" className="group">
          <SearchSelect
            orderByVal={OrderByVal}
            orderDir={orderDir}
            changesOrders={changesOrders}
            handleChange={handleChange}
          />
          <AllProductBoxes productData={filteredApts} />
        </main>
      </main>
    </>
  );
};

export default Allproducts;
