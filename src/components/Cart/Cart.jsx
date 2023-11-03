import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { Helmet } from "react-helmet";
export default function Cart() {
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState({});
  let {
    getCart,
    deleteProductFromCart,
    updateProduct,
    setNumOfCartItems,
    clearCart,
  } = useContext(CartContext);
  async function getCartDetails() {
    setIsLoading(true);
    let { data } = await getCart();
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
    setIsLoading(false);
  }
  async function deleteProduct(id) {
    setIsLoadingCart(true);
    let { data } = await deleteProductFromCart(id);
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);
    setIsLoadingCart(false);
  }
  async function updateProdutCart(id, count) {
    setIsLoadingCart(true);
    let { data } = await updateProduct(id, count);
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);

    data?.data?.products.map((ele) => {
      if (ele.count !== 0) {
        setIsLoadingCart(false);
      }
      if (ele.count == 0) {
        deleteProduct(ele.product._id);
      }
    });
  }
  async function clearUserCart(){
    setIsLoading(true)
   let response = await clearCart();
   console.log(response);
   getCartDetails();

   setIsLoading(false);
  }
  useEffect(() => {
    getCartDetails();
  }, []);
         
  return (
    <>
     <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
      <div className="container my-5">
        {isLoading && <LoadingScreen />}
        {isLoadingCart && <LoadingScreen />}
        <div className="bg-main-light p-5">
          <h1 className="mb-5 text-center h2 ">Cart shope</h1>
          <div className="d-flex justify-content-sm-between align-items-sm-center  flex-sm-row flex-column">
            <h3 className="h6 py-1">
              Total Price :{" "}
              <span className="text-main">
                {cartDetails?.data?.totalCartPrice} EGP
              </span>
            </h3>
            <h3 className="h6 py-1 ">
              Total Cart Items :{" "}
              <span className="text-main">{cartDetails?.numOfCartItems}</span>
            </h3>
          </div>
          {cartDetails?.data?.products.map((ele) => (
            <div key={ele.product._id} className="row py-2 border-bottom">
              <div className=" col-sm-2 col-lg-1">
                <img src={ele.product.imageCover} className="w-100 mb-3" alt="" />
              </div>
              <div className=" col-sm-10 col-lg-11">
                <div className="d-flex  justify-content-between align-items-center">
                  <div className="left-side ">
                    <h5>{ele.product.title.split(" ").slice(0, 3).join(" ")}</h5>
                    <p className="mb-1 text-main ">{ele.price} EGP</p>
                    <button
                      onClick={() => deleteProduct(ele.product._id)}
                      className="text-danger btn p-0 "
                    >
                      <i className="me-1 fa fa-trash-can"></i>Remove
                    </button>
                  </div>
                  <div className="right-side px-2 d-flex flex-column flex-sm-row ">
                    <button
                      onClick={() =>
                        updateProdutCart(ele.product._id, ele.count + 1)
                      }
                      className=" btn dtn-count border-1 border-success"
                    >
                      +
                    </button>
                    <span className="m-sm-3 m-1 text-center">{ele.count}</span>
                    <button
                      onClick={() =>
                        updateProdutCart(ele.product._id, ele.count - 1)
                      }
                      className=" btn dtn-count border-1 border-success"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to={"/checkout"}>
            <button className="w-100 bg-main btn text-white mb-1 mt-5">
              Checkout
            </button>

          </Link>
          <button onClick={clearUserCart} className="btn btn-danger w-100 "><i className="me-2 fa fa-trash-can"></i>Clear Cart</button>
        </div>
      </div>
    </>
  );
}
