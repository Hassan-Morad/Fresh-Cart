import React, { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { useState } from "react";
import LoadingScreen from "../loadingScreen/loadingScreen";
export default function Checkout() {
  let { onlinePayment } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function payment(values) {
    setIsLoading(true);
    try {
      const { data } = await onlinePayment(values);
      if (data?.status === "success") {
        window.location.href = data.session.url;
      } else {
        console.error("No data received from onlinePayment function.");
      }
    } catch (error) {
      console.error("An error occurred while making the payment:", error);
    }
    setIsLoading(false);
  }
  
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: payment,
  });

  return (
    <>
      <div className="container my-5">
        {isLoading && <LoadingScreen />}
        <div className="bg-main-light p-5">
          <h2 className="mb-3">Shipping Address </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="details">Details</label>
              <input
                type="tel"
                className="form-control "
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control "
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city">City</label>
              <input
                type="tel"
                className="form-control "
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </div>
            <button className="btn bg-main w-100 text-white">Pay now</button>
          </form>
        </div>
      </div>
    </>
  );
}
