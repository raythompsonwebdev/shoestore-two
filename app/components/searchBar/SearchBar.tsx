'use client'

import React, { useState } from "react";
import {
  SelectGender,
  SelectColor,
  SelectStyle,
  SelectSize,
} from "./SearchBarData";
// import { searchProducts } from '../../actions'
import { useRouter } from "next/navigation"
import  useSWR  from 'swr';

const fetcher = (url:string) => fetch(url).then((res) => res.json());


type SearchBarProps =  {
  labelname: string;
}

type SearchDataProps = {
  _id:string
  id:number
  name:string
  options: []
}

export default function SearchBar(props: SearchBarProps) {

  const router = useRouter()

  const { data , error, isLoading } = useSWR(
    "/api/searchbardata",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return (
    <aside id="search-category">
       <form id="search-category-form">
     {"Loading............"}
     </form>
    </aside>
  );

  const [size, color, gender, style] :SearchDataProps[]  = data.searchresults ;


  const SearchFormData :any = document.querySelector("#search-category-form");

  const submit = (event: { preventDefault: () => void }) => {

    event.preventDefault();

    const formData: FormData = new FormData(SearchFormData);

    //  for(let pair of formData.entries()){
    //     console.log(pair[0], pair[1]);
    //   }

    const style : FormDataEntryValue | null = formData.get('styleVal');
    const gender = formData.get('genderVal');
    const color = formData.get('colorVal');
    const size = formData.get('sizeVal');

    router.push(`/search?genderVal=${gender ?? ''}&styleVal=${style ?? ''}&sizeVal=${size ?? ''}&colorVal=${color ?? ''}&submit=Send`)

    return false;

  };


  const aria = "search-category-label";
  return (
    <aside id="search-category">
      {/* <form id="search-category-form" action="/search" onSubmit={submit}> */}
      <form id="search-category-form" onSubmit={submit}>
        <fieldset>
          <legend id="search-category-label">{props.labelname}</legend>
          <SelectGender
            name="genderVal"
            genders={gender}
            aria={aria}
          />

          <SelectStyle
            name="styleVal"
            styles={style}
            arialabelledby={aria}
          />

          <SelectSize
            name="sizeVal"
            sizes={size}
            aria={aria}
          />
          <SelectColor
            name="colorVal"
            colors={color}
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
