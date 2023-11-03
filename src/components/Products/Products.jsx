import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import LoadingScreen from "./../loadingScreen/loadingScreen";
import { Helmet } from "react-helmet";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("products", getProducts);
  let { addToCart, setNumOfCartItems } = useContext(CartContext);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingLove, setIsLoadingLove] = useState(false);
  async function addCart(id) {
    setIsLoadingCart(true); // Set isLoadingCart to true when adding to cart
    let response = await addToCart(id);
    console.log(response);
    if (response?.data.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);

      toast.success("It has been successfully added.", {
        duration: 4000,
        position: "top-right",
        className: "bg-success text-white p-3",
      });
    } else {
      toast.error("It has been successfully added.", {
        duration: 4000,
        position: "top-right",
        className: "bg-danger text-white p-3",
      });
    }
    setIsLoadingCart(false); // Set isLoadingCart to false after adding to cart
  }
  const {
    addProductToWishlist,
    wishlistItem,
    deleteWishlistItem,
    getLoggedUserWishlist,
  } = useContext(wishlistContext);
  async function addToWishlist(id) {
    setIsLoadingLove(true);
    let response = await addProductToWishlist(id);
    if (response.data.status === "success") {
      toast.success("Product added successfully to your wishlist", {
        duration: 4000,
        position: "top-right",
        className: "bg-success text-white p-3",
      });
    } else {
      toast.error("error in adding the product to your wishlist", {
        duration: 4000,
        position: "top-right",
        className: "bg-danger text-white p-3",
      });
    }
    setIsLoadingLove(false);
  }
  async function removewishlistItem(id) {
    setIsLoadingLove(true);
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 4000,
        position: "top-right",
        className: "bg-success text-white p-3",
      });
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 4000,
        position: "top-right",
        className: "bg-danger text-white p-3",
      });
    }
    setIsLoadingLove(false);  
  }
  useEffect(() => {
    getLoggedUserWishlist();  
  },[getLoggedUserWishlist]);
 

  return (
    <>
       <Helmet>
        <title>Products</title>
        <meta name="description" content="User Products Page" />
      </Helmet>
      <div className="container py-5">
        {isLoading && <LoadingScreen />}
        {isLoadingCart && <LoadingScreen />}
        {isLoadingLove && <LoadingScreen />}
        <div className="row gy-4">
          {data?.data?.data.map((ele) => (
            <div key={ele.id} className=" col-lg-3 col-md-4 col-sm-6 product-cursor">
              <div className="product rounded-3  d-flex flex-column align-items-center hhhh position-relative ">
                <i
                  className={`fa-${
                    wishlistItem.includes(ele.id) ? "solid" : "regular"
                  } text-danger fa-heart heart  product-cursor p-3 fs-3 position-absolute heartIcon`}
                  onClick={() => {
                    if (!wishlistItem.includes(ele.id)) {
                      addToWishlist(ele.id);
                    } else {
                      removewishlistItem(ele.id);
                    }
                  }}
                ></i>
                <Link to={"/details/" + ele.id}>
                  <div className="photo">
                    <img
                      src={ele.imageCover}
                      className="w-100  rounded-top-3"
                      alt=""
                    />
                  </div>
                  <div className="px-3 pt-1">
                    <p className="text-main">{ele.category.name}</p>
                    <h4 className="h5">
                      {ele.title.split(" ").splice(0, 2).join(" ")}
                    </h4>
                    <div className="d-flex justify-content-between">
                      <p>{ele.price} EGP</p>
                      <p>
                        <i className="fa fa-star rating-color"></i>
                        {ele.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addCart(ele.id)}
                  className="bg-main text-white w-75 mb-3  btn"
                >
                  + Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
