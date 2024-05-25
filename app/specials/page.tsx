"use client";
import { SetStateAction, useState, useEffect } from "react";
import SpecialsProductBoxes from "../../components/specials/specialsProductBoxes";
import AccordianMenu from "../../components/accordianMenu";
import SearchBar from "../../components/searchBar/SearchBar";
import SearchSelect from "../../components/searchSelect/SearchSelect";
import {
  selectAllProducts,
  fetchProducts,
  getProductsStatus,
} from "../../features/products/productSlice";
import { useSelector, useDispatch } from "../../features/store";

const Specials = () => {
  const [OrderDir, setOrderByDir] = useState<string>("asc");
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
        <SearchBar labelname="Specials" />

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

        <section id="right-content-section" role="main">
          <SearchSelect
            orderByVal={OrderByVal}
            orderDir={OrderDir}
            changesOrders={changesOrders}
            handleChange={handleChange}
          />
          <SpecialsProductBoxes productData={filteredApts} />

          <br />
        </section>
      </main>
    </>
  );
};

export default Specials;
