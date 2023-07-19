'use client';
import React,{ Key , useState }from "react";

interface OptionsProp {
  _id:string
  id:number
  name:string
  options:[]
}



export function SelectColor(props: {
  aria: string;
  colors: OptionsProp;
  name: string;
}) {
  const [colorVal, setColorVal] = useState<string>(" ");
  const { aria, colors, name } = props;
  const { options } = {...colors};

  const colorHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setColorVal(value);
  };

  return (

    <select
      name={name}
      value={colorVal}
      onChange={colorHandler}
      aria-labelledby={aria}
      className="search-category-input"
    >
      {options !== undefined ?
      options.map(
        (option: {
          value: string | undefined;
          id: Key | null | undefined;
          displayValue: string | null | undefined;
        }) => (
          <option value={option.value} key={option.id}>
            {option.displayValue}
          </option>
        )
      )
      :
        <option value="" key={1}>
            No Data Available
          </option>

      }
    </select>
  );
}

export function SelectGender(props: {
  aria: string;
  genders: OptionsProp;
  name: string;
}) {
  const [genderVal, setGenderVal] = useState<string>(" ");
  const { aria, genders, name } = props;
  const { options } = {...genders};

  const genderHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setGenderVal(value);
  };

  return (
    <select
      name={name}
      value={genderVal}
      onChange={genderHandler}
      aria-labelledby={aria}
      className="search-category-input"
    >
      { options ?
      options.map(
        (option: {
          value: string | readonly string[] | undefined;
          id: Key | null | undefined;
          displayValue: string | null | undefined;
        }) => (
          <option value={option.value} key={option.id}>
            {option.displayValue}
          </option>
        )
      )
      :
        <option value="" key={1}>
            No Data Available
          </option>
    }
    </select>
  );
}

export function SelectSize(props: {
  aria: string;
  // sizeHandler: (event: { target: {value :string} }) => void;
  sizes: OptionsProp;
  name: string;

}) {
  const [sizeVal, setSizeVal] = useState<string>(" ");
  const { aria, name, sizes } = props;
  const { options } = {...sizes};

  const sizeHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setSizeVal(value);
  };

  return (
    <select
      name={name}
      value={sizeVal}
      onChange={sizeHandler}
      aria-labelledby={aria}
      className="search-category-input"
    >
      {options ?
      options.map(
        (option: {
          value: string | readonly string[] | undefined;
          id: Key | null | undefined;
          displayValue: string | null | undefined;
        }) => (
          <option value={option.value} key={option.id}>
            {option.displayValue}
          </option>
        )
      )
      :
        <option value="" key={1}>
            No Data Available
          </option>
    }
    </select>
  );
}

export function SelectStyle(props: {
  arialabelledby: string;
  // styleHandler: (event: { target: {value :string} }) => void;
  styles: OptionsProp;
  name: string;

}) {
  const [styleVal, setStyleVal] = useState<string>(" ");
  const { arialabelledby, name, styles } = props;
  const { options } = {...styles};

  const styleHandler = (event: { target: {value :string} }) :void => {
    const { target } = event;
    const { value } = target;
    setStyleVal(value);
  };


  return (
    <select
      name={name}
      value={styleVal}
      onChange={styleHandler}
      aria-labelledby={arialabelledby}
      className="search-category-input"
    >
      {options ?
      options.map(
        (option: {
          value: string | readonly string[] | undefined;
          id: Key | null | undefined;
          displayValue: string | null | undefined;
        }) => (
          <option value={option.value} key={option.id}>
            {option.displayValue}
          </option>
        )
      )
      :
      <option value="" key={1}>
            No Data Available
          </option>
    }
    </select>
  );
}
