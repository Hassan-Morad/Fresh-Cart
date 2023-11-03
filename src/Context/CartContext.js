import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export let CartContext = createContext();


export default function CartContextProvider(props) {
  const [cartID, setCartID] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function clearCart(){
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems)
        return res
      })
      .catch((err) => err);
  }
  function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems)
        return res;
      })
      .catch((err) => err);
  }
  
  function deleteProductFromCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems)
        return res
      })
      .catch((err) => err);
  }
  
  function updateProduct(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems)
        return res;
      })
      .catch((err) => err);
  }
  
  function getCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function onlinePayment(shippingAddress) {
    const redirectURL = 'https://fresh-cart-topaz.vercel.app';

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${redirectURL}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  async function getIntialCart() {
    let { data } = await getCart();
    setNumOfCartItems(data?.numOfCartItems);
    setCartID(data?.data?._id);
  }

  useEffect(() => {
    getIntialCart();
  }, [cartID]);
    return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        getIntialCart,
        deleteProductFromCart,
        updateProduct,
        onlinePayment,
        numOfCartItems,
        setNumOfCartItems,
        clearCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
