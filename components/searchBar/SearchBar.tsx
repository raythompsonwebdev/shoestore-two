"use client";
import React, { useState } from "react";
import {
  SelectGender,
  SelectColor,
  SelectStyle,
  SelectSize,
} from "./SearchBarData";
import { SearchBarType } from "../../types/index";
import { useRouter } from "next/navigation";

const searchData: SearchBarType[] = [
  {
    id: 1,
    name: "genders",
    options: [
      {
        id: 1,
        value: "",
        displayValue: "-- Select Gender --",
      },
      {
        id: 2,
        value: "men",
        displayValue: "Men",
      },
      {
        id: 3,
        value: "women",
        displayValue: "Women",
      },
      {
        id: 4,
        value: "girl",
        displayValue: "Girls",
      },
      {
        id: 5,
        value: "boy",
        displayValue: "Boys",
      },
    ],
  },
  {
    id: 2,
    name: "styles",
    options: [
      {
        id: 1,
        value: "",
        displayValue: "-- Select Style -- ",
      },
      {
        id: 2,
        value: "trainers",
        displayValue: "Trainers",
      },
      {
        id: 3,
        value: "boots",
        displayValue: "Boots",
      },
      {
        id: 4,
        value: "skate",
        displayValue: "Skate",
      },
      {
        id: 5,
        value: "basketball",
        displayValue: "BasketBall",
      },
      {
        id: 6,
        value: "running",
        displayValue: "Running",
      },
      {
        id: 7,
        value: "loafers",
        displayValue: "Loafers",
      },
      {
        id: 8,
        value: "laced",
        displayValue: "Laced",
      },
      {
        id: 9,
        value: "stilletto",
        displayValue: "Stilletto",
      },
    ],
  },
  {
    id: 3,
    name: "sizes",
    options: [
      {
        id: 1,
        value: "",
        displayValue: "-- Select Size -- ",
      },
      {
        id: 2,
        value: "four",
        displayValue: "Four",
      },
      {
        id: 3,
        value: "five",
        displayValue: "Five",
      },
      {
        id: 4,
        value: "six",
        displayValue: "Six",
      },
      {
        id: 5,
        value: "seven",
        displayValue: "Seven",
      },
      {
        id: 6,
        value: "eight",
        displayValue: "Eight",
      },
      {
        id: 7,
        value: "nine",
        displayValue: "Nine",
      },
    ],
  },
  {
    id: 4,
    name: "colors",
    options: [
      {
        id: 1,
        value: "",
        displayValue: " -- Select Color -- ",
      },
      {
        id: 2,
        value: "white",
        displayValue: "White",
      },
      {
        id: 3,
        value: "black",
        displayValue: "Black",
      },
      {
        id: 4,
        value: "brown",
        displayValue: "Brown",
      },
      {
        id: 5,
        value: "beige",
        displayValue: "Beige",
      },
      {
        id: 6,
        value: "blue",
        displayValue: "Blue",
      },
      {
        id: 7,
        value: "red",
        displayValue: "Red",
      },
      {
        id: 8,
        value: "pink",
        displayValue: "Pink",
      },
    ],
  },
];

const SearchBar = (props: { labelname: string }) => {
  const [genderVal, setGenderVal] = useState<string>("");
  const [sizeVal, setSizeVal] = useState<string>("");
  const [styleVal, setStyleVal] = useState<string>("");
  const [colorVal, setColorVal] = useState<string>("");

  const router = useRouter();

  const { labelname } = props;

  const [gender, style, size, color] = searchData;

  const genderHandler = (event: { target: { value: string } }): void => {
    const { target } = event;
    const { value } = target;
    setGenderVal(value);
  };

  const styleHandler = (event: { target: { value: string } }): void => {
    const { target } = event;
    const { value } = target;
    setStyleVal(value);
  };

  const sizeHandler = (event: { target: { value: string } }): void => {
    const { target } = event;
    const { value } = target;
    setSizeVal(value);
  };

  const colorHandler = (event: { target: { value: string } }) => {
    const { target } = event;
    const { value } = target;
    setColorVal(value);
  };

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // send data to search results page as url query params -query string
    router.push(
      `/search?genderVal=${genderVal ?? ""}&styleVal=${styleVal ?? ""}&sizeVal=${
        sizeVal ?? ""
      }&colorVal=${colorVal ?? ""}`
    );
    // return false;
  };

  const aria = "search-category-label";

  return (
    <aside id="search-category">
      <form id="search-category-form" onSubmit={submit}>
        <fieldset>
          <legend
            className={`search-category-label ${
              labelname === "New Products" || labelname === "All Products"
                ? "search-category-label-new "
                : ""
            }`}
          >
            {labelname}
          </legend>
          <SelectGender
            name="genderVal"
            genders={gender || ""}
            value={genderVal}
            genderHandler={genderHandler}
            aria={aria}
          />

          <SelectStyle
            name="styleVal"
            styles={style || ""}
            value={styleVal}
            styleHandler={styleHandler}
            aria={aria}
          />

          <SelectSize
            name="sizeVal"
            sizes={size || ""}
            value={sizeVal}
            sizeHandler={sizeHandler}
            aria={aria}
          />
          <SelectColor
            name="colorVal"
            colors={color || ""}
            value={colorVal}
            colorHandler={colorHandler}
            aria={aria}
          />
          {/* <Link
            href={{
              pathname: '/search',
              query: { resultArray },
            }}
            className="search-category-btn"
            type="submit"
          >
            Go
          </Link> */}
          <input type="submit" className="search-category-btn" value="GO" />
        </fieldset>
      </form>
    </aside>
  );
};

export default SearchBar;
