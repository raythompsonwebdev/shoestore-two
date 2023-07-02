"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [visibility, setVisibility] = useState<boolean>(false);

  const menuToggleFunc = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <ul id="" className={`mobile-nav ${visibility ? "is-expanded" : " "}`}>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/"
          title="Home Page"
          aria-label="Home Page"
          onMouseUp={menuToggleFunc}
        >
          Home
        </Link>
      </li>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/newproducts"
          title="new products page"
          aria-label="new products page"
          onMouseUp={menuToggleFunc}
        >
          New Products
        </Link>
      </li>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/specials"
          title="specials page"
          aria-label="specials page"
          onMouseUp={menuToggleFunc}
        >
          Specials
        </Link>
      </li>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/allproducts"
          title="all products page"
          aria-label="all products page"
          onMouseUp={menuToggleFunc}
        >
          All Products
        </Link>
      </li>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/faqs"
          title="faqs page"
          aria-label="faqs page"
          onMouseUp={menuToggleFunc}
        >
          FAQS
        </Link>
      </li>
      <li className="mobile-nav-item">
        <Link
          className="mobile-nav-link"
          href="/contact"
          title="contact page"
          aria-label="contact page"
          onMouseUp={menuToggleFunc}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
