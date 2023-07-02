import React, { ReactNode } from "react";
import {NextAuthSessionProvider} from "./sessionProvider";
import Header from "./components/header";
import MainNav from "./components/(MainNav)/mainNav";
import Footer from "./components/footer";
import "../styles/sass/style.scss";
// import { Old_Standard_TT } from 'next/font/google'

export default function RootLayout({
  children,
}: {
  children: ReactNode;

}) {
  return (
    <html lang="en">
       <body>
         <div id="wrapper">
          <Header />
          <NextAuthSessionProvider>
            <MainNav />
            {children}
          </NextAuthSessionProvider>
          <Footer />
         </div>
       </body>
    </html>
  );
}
