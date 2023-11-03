import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlistItem, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  function addProductToWishlist(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      )
      .then((response) => {
        setWishlist(response?.data.data);
        setWishlistCount(response?.data.data.length);
        return response;
      })
      .catch((error) => error);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        setWishlistCount(response?.data.count);

        setWishlist(
          response?.data.data.map((item) => {
            return item._id;
          })
        );

        return response;
      })
      .catch((error) => error);
  }

  function deleteWishlistItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        setWishlist(response?.data?.data);
        setWishlistCount(response?.data?.data.length);
        return response;
      })
      .catch((error) => error);
  }
       
  useEffect(() => {
    getLoggedUserWishlist();
  });

  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        setWishlist,
        wishlistItem,
        deleteWishlistItem,
        wishlistCount,
        setWishlistCount,
        getLoggedUserWishlist,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
