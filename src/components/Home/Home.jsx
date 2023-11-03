import React from "react";
import Products from "../Products/Products";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "./../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      
      <MainSlider />
      <CategoriesSlider />
      <Products />
      <Helmet>
        <title>FreshCart</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
    </>
  );
}
