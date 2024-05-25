"use client";

import Link from "next/link";

const Thankyou = () => {
  return (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Your Details Have Been Received</h1>

        <section id="main-inner-content" className="group">
          <h2 className="context-title">Thank you for your message</h2>
          <p>An email has been sent to your email address </p>
          <p>
            Click
            <Link href="/" aria-label="go to home page link">
              here
            </Link>
            to get back to the home page.
          </p>
        </section>
      </main>
    </>
  );
};

export default Thankyou;
