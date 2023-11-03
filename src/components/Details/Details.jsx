import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { useState } from "react";
import { Helmet } from "react-helmet";
export default function Details() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let params = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading } = useQuery(
    "details",
    () => getProductDetails(params.id),
    {
      cacheTime: 0,
    }
  );
  let { addToCart,setNumOfCartItems } = useContext(CartContext);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  async function addCart(id) {
    setIsLoadingCart(true); // Set isLoadingCart to true when adding to cart
    let response = await addToCart(id);
    console.log(response);
    if (response.data.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);

      toast.success('It has been successfully added.', {
        duration: 4000,
        position: 'top-right',
        className: 'bg-success text-white p-3',
      });
    } else {
      toast.error('It has been successfully added.', {
        duration: 4000,
        position: 'top-right',
        className: 'bg-danger text-white p-3',
      });
    }
    setIsLoadingCart(false); // Set isLoadingCart to false after adding to cart
  }
  return (       
    <>
      <Helmet>
        <title>{data?.data?.data.title}</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
        <div className="container  mb-5 mt-5">
          {isLoading  && <LoadingScreen />}
        {isLoadingCart  && <LoadingScreen />}
          <div className="row  align-items-center">
            <div className="col-sm-4 mb-4">
              <Slider {...settings}>
                {data?.data?.data.images.map((ele, idx) => (
                  <img key={idx} className="w-100" src={ele} alt="" />
                ))}
              </Slider>
            </div>
            <div className="col-sm-8">
              <h2>{data?.data?.data.title}</h2>
              <p>{data?.data?.data.category.name}</p>
              <p>{data?.data?.data.description}</p>
              <div className="d-flex  justify-content-between  ">
                <h5>{data?.data?.data.price} EGP</h5>
                <h5>
                  {data?.data?.data.ratingsAverage}
                  <i className="fa fa-star rating-color"></i>
                </h5>
              </div>
              <button
                onClick={() => addCart(data?.data?.data.id)}
                className="bg-main text-white w-100 btn"
              >
              + Add to catr
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
