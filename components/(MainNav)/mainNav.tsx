
import React from 'react';
import MenuToggleBtn from "./menuToggleBtn";
import MobileMenu from "./mobileMenu";
import SignInBox from "./singInBox";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav id="main-nav" role="navigation">
      <ul id="inner-nav">
        <li className="inner-nav-item">
          <Link
            href="/"
            className="inner-nav-link"
            title="Home Page"
            aria-label="Home Page"
          >
            Home
          </Link>
        </li>
        <li className="inner-nav-item">
          <Link
            href="/newproducts"
            className="inner-nav-link"
            title="new products page"
            aria-label="new products page"
          >
            New Products
          </Link>
        </li>
        <li className="inner-nav-item">
          <Link
            href="/specials"
            className="inner-nav-link"
            title="specials page"
            aria-label="specials page"
          >
            Specials
          </Link>
        </li>
        <li className="inner-nav-item">
          <Link
            href="/allproducts"
            className="inner-nav-link"
            title="all products page"
            aria-label="all products page"
          >
            All Products
          </Link>
        </li>
        <li className="inner-nav-item">
          <Link
            href="/faqs"
            className="inner-nav-link"
            title="faqs page"
            aria-label="faqs page"
          >
            FAQS
          </Link>
        </li>
        <li className="inner-nav-item">
          <Link
            href="/contact"
            className="inner-nav-link"
            title="contact page"
            aria-label="contact page"
          >
            Contact
          </Link>
        </li>
      </ul>

      <MobileMenu />

      <SignInBox />

      <MenuToggleBtn />
    </nav>
  );
}
