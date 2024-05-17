import Link from "next/link";
// import { useRouter } from "next/router";

export const metadata = {
  title: "Thank You Page",
  description: "Thank You Page",
};

const Thankyou = ({ params }: any) => {
  const { username, useremail } = params;

  return (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Your Message Has Been Received</h1>

        <section id="main-inner-content" className="group">
          <h3 className="context-title">
            Thank you for your message {username}
          </h3>
          <h3 className="context-title">
            Thank you for your message {useremail}
          </h3>
          <p>An email has been sent to your email address {useremail}</p>
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
