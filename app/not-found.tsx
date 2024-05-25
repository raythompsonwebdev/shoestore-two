// import Head from "next/head";
import Link from "next/link";
// import { useRouter } from "next/router";

export const metadata = {
  title: "Not Found",
  description: "404",
};

const NotFound = () => {
  return (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Not Found</h1>
        <section id="main-inner-content" className="group">
          <h2 className="main-inner-content-title">
            Click
            <Link href="/" aria-label="go to home page link">
              here
            </Link>
            to get back to the home page.
          </h2>
        </section>
      </main>
    </>
  );
};

export default NotFound;
