"use client";
import React, { Key } from "react";
import { SelectBarType } from "../../types/index";

interface SearchSelector {
  changesOrders: (orderbyval: string, dir: string) => void;
  handleChange: (selected: string) => void;
  orderByVal: string;
  orderDir: string;
}

const selectBarData: SelectBarType[] = [
  {
    id: 1,
    name: "all",
    value: "all",
    options: [
      {
        id: 1,
        value: "all",
        displayValue: "All shoes",
      },
    ],
  },
  {
    id: 2,
    name: "gender",
    value: "gender",
    options: [
      {
        id: 1,
        value: "men",
        displayValue: "Men",
      },
      {
        id: 2,
        value: "women",
        displayValue: "Women",
      },
      {
        id: 3,
        value: "boy",
        displayValue: "Boy",
      },
      {
        id: 4,
        value: "girl",
        displayValue: "Girl",
      },
    ],
  },
  {
    id: 3,
    name: "style",
    value: "style",
    options: [
      {
        id: 1,
        value: "trainers",
        displayValue: "Trainers",
      },
      {
        id: 2,
        value: "high-heels",
        displayValue: "High Heels",
      },
      {
        id: 3,
        value: "skate",
        displayValue: "Skate",
      },
      {
        id: 4,
        value: "boots",
        displayValue: "Boots",
      },
      {
        id: 5,
        value: "laced",
        displayValue: "Laced",
      },
      {
        id: 6,
        value: "stilletos",
        displayValue: "Stillettos",
      },
      {
        id: 7,
        value: "ballet",
        displayValue: "Ballet",
      },
      {
        id: 8,
        value: "dress",
        displayValue: "Dress",
      },
      {
        id: 9,
        value: "loafers",
        displayValue: "Loafers",
      },
    ],
  },
  {
    id: 4,
    name: "size",
    value: "size",
    options: [
      {
        id: 1,
        value: "four",
        displayValue: "Four",
      },
      {
        id: 2,
        value: "five",
        displayValue: "Five",
      },
      {
        id: 3,
        value: "six",
        displayValue: "Six",
      },
      {
        id: 4,
        value: "seven",
        displayValue: "Seven",
      },
      {
        id: 5,
        value: "eight",
        displayValue: "Eight",
      },
      {
        id: 6,
        value: "nine",
        displayValue: "Nine",
      },
      {
        id: 7,
        value: "ten",
        displayValue: "Ten",
      },
    ],
  },
  {
    id: 5,
    name: "color",
    value: "color",
    options: [
      {
        id: 1,
        value: "white",
        displayValue: "White",
      },
      {
        id: 2,
        value: "black",
        displayValue: "Black",
      },
      {
        id: 3,
        value: "brown",
        displayValue: "Brown",
      },
      {
        id: 4,
        value: "beige",
        displayValue: "Beige",
      },
      {
        id: 5,
        value: "blue",
        displayValue: "Blue",
      },
      {
        id: 6,
        value: "grey",
        displayValue: "Grey",
      },
      {
        id: 7,
        value: "pink",
        displayValue: "Pink",
      },
      {
        id: 8,
        value: "red",
        displayValue: "Red",
      },
    ],
  },
];

const SearchSelect = (props: SearchSelector) => {
  const { changesOrders, handleChange, orderDir } = props;

  const onItemChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    handleChange(value);
    changesOrders(value, orderDir);
  };

  return (
    <form className="search-products">
      <label>Search Products </label>

      <select
        name="value"
        onChange={onItemChange}
        className="search-products-select"
      >
        {selectBarData.map((options) => (
          <optgroup label={options.value} key={options.id}>
            {options.options.map(
              (option: {
                id: Key | number;
                value: string | undefined;
                displayValue: string | undefined;
              }) => (
                <option key={option.id} value={option.value}>
                  {option.displayValue}
                </option>
              )
            )}
          </optgroup>
        ))}
      </select>
    </form>
  );
};

export default SearchSelect;
