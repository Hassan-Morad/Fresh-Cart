import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
      <div className="page-container">
        <Navbar />
        <Outlet></Outlet>
        <Toaster />
        <Footer />
      </div>
    </>
  );
}
