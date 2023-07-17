  'use client';
import React, { SetStateAction, useEffect, useState } from "react";
import AllProductBoxes from "../allproducts/allProductBoxes";
import SearchSelect from "../searchSelect/SearchSelect";
import {FilteredData , AllData} from "../../../types/index"

export default function AllProducts() {

  const [productData, setProductData] = useState<Array<FilteredData>>([]);
  const [selectbarData, setSelectData] = useState<[]>([]);
  const [orderDir, setOrderByDir] = useState<string>("asc");
  const [OrderByVal, setOrderByVal] = useState<string>("all");


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/allproductsdata");
      const json :AllData = await res.json();
      if (json) {
        setProductData(json.product);
        setSelectData(json.selectresults)
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedSize: SetStateAction<string>) => {
    setOrderByVal(selectedSize);
    setOrderByDir("asc");
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
    <SearchSelect
      orderByVal={OrderByVal}
      orderDir={orderDir}
      changesOrders={changesOrders}
      handleChange={handleChange}
      selectBarData={selectbarData}
    />
    <AllProductBoxes productData={filteredApts} />
  </>
  )
}
