import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isLoading } = useQuery("brands", getBrands);

  console.log(data);
  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Categories Page" />
      </Helmet>
      <div className="container py-5">
        {isLoading && <LoadingScreen />}
        <div className="row gy-4">
          {data?.data?.data.map((ele) => (
            <div
              key={ele._id}
              className=" col-lg-3 col-md-4 col-sm-6 product-cursor"
            >
              <div className="product rounded-3  d-flex flex-column align-items-center  position-relative ">
                <Link to={"/specificbrand/" + ele._id}>
                  <div className="photo">
                    <img
                      src={ele.image}
                      className="w-100 hight-brands rounded-top-3"
                      alt=""
                    />
                  </div>
                  <h3 className="text-center py-3">{ele.name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
