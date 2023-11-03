import React from "react";
import { Helmet } from "react-helmet";
import img404 from "../../Assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 page</title>
        <meta name="description" content="404 Page" />
      </Helmet>
      <div className="mt-5 mb-3 d-flex justify-content-center align-items-center">
        <img src={img404} alt="404" />
      </div>
    </>
  );
}
