import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import {  useParams } from "react-router-dom";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { Helmet } from "react-helmet";

export default function SpecificBrand() {
  let params = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
  let { data, isLoading } = useQuery(
    "details",
    () => getProductDetails(params.id),
    {
      cacheTime: 0,
    }
  );
  return (
    <>
      <Helmet>
        <title>Brand Details</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>

      <div className="container bg-main-light shadow rounded-4 p-4 my-5">
        {isLoading && <LoadingScreen />}
        <div className="row align-items-center">
          <div className="col-md-4">
            <img
              className="rounded-3 w-100"
              src={data?.data?.data.image}
              alt=""
            />
          </div>
          <div className="col-md-8">
            <h2>{data?.data?.data.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
