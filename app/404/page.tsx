"use client";

import React from 'react';
import Link from "next/link";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Not Found page",
//   description: "Raymond's Page",
// };

export default function NotFound() {
  return (
    <>
      <main id="main-content" role="main" style={{ minHeight: "400px" }}>
        <h1 className="main-content-title">Oops! Error.</h1>
        <p>
          Click
          <Link href="/" aria-label="go to home page link">
            here
          </Link>
          to get to Home page
        </p>
      </main>
    </>
  );
}
