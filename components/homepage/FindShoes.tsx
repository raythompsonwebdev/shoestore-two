"use client";
import React from "react";

const myComponentStyle = {
  backgroundImage: "url('/images/form-bg-comp.png')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundCize: "cover",
};

export default function FindShoes() {
  return (
    <article id="front-page-form-container" style={myComponentStyle}>
      <h1 id="front-page-form-header">
        {" "}
        FIND <br /> YOUR SHOES{" "}
      </h1>
      <form id="front-page-form" action="" method="get">
        <select name="gender">
          <option value="Male">Mens</option>
          <option value="Female">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select name="foot-size">
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <select name="shoe-type">
          <option value="Trainers">Trainers</option>
          <option value="Ladies Boots">Boots</option>
          <option value="Skate Shoes">Skate Shoes</option>
          <option value="Boots">Laced Shoes</option>
        </select>
        <input
          name="find-shoes"
          className="find-shoes"
          type="submit"
          value="FIND"
        />
      </form>
    </article>
  );
}
