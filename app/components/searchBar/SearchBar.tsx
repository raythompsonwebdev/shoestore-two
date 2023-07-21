'use client'
import React from "react";
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

  const submit = (event: { preventDefault: () => void }) => {

    event.preventDefault();

    const SearchFormData = document.querySelector("#search-category-form") as HTMLFormElement;

    const formData: FormData = new FormData(SearchFormData);

    const style : FormDataEntryValue | null = formData.get('styleVal');
    const gender : FormDataEntryValue | null = formData.get('genderVal');
    const color : FormDataEntryValue | null = formData.get('colorVal');
    const size  : FormDataEntryValue | null = formData.get('sizeVal');

    router.push(`/search?genderVal=${gender ?? ''}&styleVal=${style ?? ''}&sizeVal=${size ?? ''}&colorVal=${color ?? ''}`)

    return false;

  };


  const aria = "search-category-label";
  return (
    <aside id="search-category">
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
          <input type="submit" className="search-category-btn" value="Send" name="submit" />
        </fieldset>
      </form>
    </aside>
  );
}
