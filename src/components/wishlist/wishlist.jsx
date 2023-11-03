import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import LoadingScreen from "../loadingScreen/loadingScreen";

export default function Wishlist() {
  const { getLoggedUserWishlist, deleteWishlistItem } =
    useContext(wishlistContext);
  let [isLoading, setLoading] = useState(true);
  let [wishlistDetails, setWishlistDetails] = useState(null);

  const displayWishlistItems = useCallback(async () => {
    const response = await getLoggedUserWishlist();
    setLoading(false);
    if (response?.data.status === "success") {
      setWishlistDetails(response?.data);
    }
    return wishlistDetails;
  }, [getLoggedUserWishlist, wishlistDetails]);

  async function removewishlistItem(id) {
    setLoading(true);
    let response = await deleteWishlistItem(id);
    if (response?.data.status === "success") {
      toast.success("Product removed successfully from your wishlist", {
        duration: 4000,
        position: 'top-right',
        className: 'bg-success text-white p-3',
      });
      displayWishlistItems();
    } else {
      toast.error("error in removing the product from your wishlist", {
        duration: 4000,
        position: 'top-right',
        className: 'bg-danger text-white p-3',
      });
    }
    setLoading(false);
  }

  let { addToCart} = useContext(CartContext);
  async function addToCartItem(id){
    setLoading(true);
   let response = await addToCart(id);
   console.log(response);
   if (response?.data.status === "success") {
    await deleteWishlistItem(id)
    await displayWishlistItems();
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
    setLoading(false)
  }
  useEffect(() => {
    displayWishlistItems();
  }, [displayWishlistItems]);

  return (
    <>
      {isLoading && <LoadingScreen/>}
      { wishlistDetails === null ? (
        <h1 className="h3 fw-bolder my-4">Your Wishlist is empty</h1>
      ) : (
        <>
          <Helmet>
            <title>Wishlist</title>
            <meta name="description" content="Wishlist Page" />
          </Helmet>
          <div className="bg-body-tertiary py-5 px-4 mt-5 container">
            <h1 className="h3 fw-bolder mb-4">Wishlist</h1>

            <h2 className="h6 fw-bold mt-4">
              Total number of items:{" "}
              <span className="text-main">{wishlistDetails.count}</span>
            </h2>

            {wishlistDetails.data.map((product) => {
              return (
                <div
                  className="row justify-content-between align-items-center g-4 py-3 border-bottom border-1 border-dark border-opacity-25"
                  key={product._id}
                >
                  <div className="col-sm-4 col-lg-3">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                      height={300}
                    />
                  </div>
                  <div className="col-sm-8 col-lg-9">
                    <div className="row flex-column flex-lg-row justify-content-between ">
                      <div className="col-lg-6">
                        <h3 className="h5 fw-bolder mb-3">
                          {product.title.split(" ").splice(0, 3).join(" ")}
                        </h3>

                        <span className="fw-bold me-3">
                          <span className=" text-main ">Price: </span>
                          {product.price} EGP
                        </span>
                        <span className=" d-inline-block">
                          <i className="fa-solid fa-star rating-color me-2"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                      <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                        <div className="row g-2 align-items-stretch">
                          <div className="col-lg-6">
                            <button
                              className="btn  btn-outline-danger me-lg-3  d-block w-100 h-100"
                              onClick={() => {
                                removewishlistItem(product._id);
                              }}
                            >
                              <i className="fa-solid fa-trash me-2 "></i> Remove
                            </button>
                          </div>
                          <div className="col-lg-6">
                            {" "}
                            <button
                              className="btn  border border-success dtn-count d-block w-100 h-100"
                              onClick={() => addToCartItem(product._id)}
                            >
                              {" "}
                              <i className="fa-solid fa-plus me-2"></i>
                              Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </>
      )}
    </>
  );
}
