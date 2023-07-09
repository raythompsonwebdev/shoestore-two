'use client'

import React, { useState } from "react";
// import Link from "next/link";
import {
  SelectGender,
  SelectColor,
  SelectStyle,
  SelectSize,
} from "./SearchBarData";
// import { searchProducts } from '../../actions'
import { redirect } from 'next/navigation'


type SearchBarProps =  {
  labelname: string
  searchBarData: []
}

type SearchDataProps = {
  _id:string
  id:number
  name:string
  options: []
}

export default function SearchBar(props: SearchBarProps) {
  const { labelname, searchBarData } = props;

  const [genderVal, setGenderVal] = useState<string>(" ");
  const [sizeVal, setSizeVal] = useState<string>(" ");
  const [styleVal, setStyleVal] = useState<string>(" ");
  const [colorVal, setColorVal] = useState<string>(" ");

  const genderHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setGenderVal(value);
  };

  const styleHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setStyleVal(value);
  };

  const sizeHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setSizeVal(value);
  };

  const colorHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setColorVal(value);
  };

  //const resultArray : [] = [genderVal, styleVal, sizeVal, colorVal];

  const SearchFormData :any = document.querySelector("#search-category-form");

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData(SearchFormData);

    // for(let pair of formData.entries()){
    //   console.log(pair[0], pair[1]);
    // }

    const data = [...formData.entries()];

    console.log(data);

    if (data) {
      redirect('/search')
    }


  };

  const [gender, style, size, color] :SearchDataProps[]  = searchBarData ;


  const aria = "search-category-label";
  return (
    <aside id="search-category">
      <form id="search-category-form" onSubmit={submit}>
        <fieldset>
          <legend id="search-category-label">{labelname}</legend>
          <SelectGender
            name="genderVal"
            genders={gender}
            value={genderVal}
            genderHandler={genderHandler}
            aria={aria}
          />

          <SelectStyle
            name="styleVal"
            styles={style}
            value={styleVal}
            styleHandler={styleHandler}
            arialabelledby={aria}
          />

          <SelectSize
            name="sizeVal"
            sizes={size}
            value={sizeVal}
            sizeHandler={sizeHandler}
            aria={aria}
          />
          <SelectColor
            name="colorVal"
            colors={color}
            value={colorVal}
            colorHandler={colorHandler}
            aria={aria}
          />
          {/* <Link
            href={{
              pathname: "/search",
              query: { resultArray },
            }}
            className="search-category-btn"
            type="submit"
          >
            <button name="find">Go</button>
          </Link> */}
          <input type="submit" className="search-category-btn" value="Send" name="submit" />
        </fieldset>
      </form>
    </aside>
  );
}
