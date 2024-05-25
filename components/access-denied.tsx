"use client";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <main id="main-content" className="clearfix">
      <h1 id="main-content-title">You're Not Signed In</h1>
      <section id="main-inner-content" className="group">
        <h2 className="main-inner-content-title">
          You must be signed in to view profile page{" "}
          <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Click here to Sign In!
          </Link>
        </h2>
      </section>
    </main>
  );
}
