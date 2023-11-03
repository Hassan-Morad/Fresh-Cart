import React, { useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { tokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let { setToken } = useContext(tokenContext);
  let { getIntialCart } = useContext(CartContext);
  const timeoutRef = useRef(null); 
  async function loginSubmet(values) {
    setError(null);
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      await setToken(data.token);
      localStorage.setItem("userToken", data.token);
      await getIntialCart();
      setisLoading(false);
      setError(null);
      setSuccess("Welcome back");
      timeoutRef.current = setTimeout(() => { // Use the timeoutRef
        navigate("/");
      }, 1000);
    }
  }


useEffect(() => {
return () => {
  clearTimeout(timeoutRef.current); // Clear the timeout when the component unmounts
};
}, []);
 
  let validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email not valid"
      )
      .required("Email is required"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z]).{6,}$/, "Password not valid")
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmet,
  });

  return (
    <>   
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        {success ? <div className="alert alert-success">{success}</div> : ""}
        <h2>Login : </h2>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <label className="mt-2" htmlFor="email">
            Email :
          </label>
          <input
            className="form-control  "
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert-danger alert py-1 mt-1">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label className="mt-2" htmlFor="password">
            Password :
          </label>
          <input
            className="form-control  "
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert-danger alert py-1 mt-1">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <div className="d-flex  align-items-center">
            {isLoading ? (
              <button className="bg-main text-white mt-3 btn " type="button">
                <Circles
                  height="25"
                  width="65"
                  color="white"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="bg-main text-white mt-3 btn "
                type="submit"
              >
                Login
              </button>
            )}
            
          </div>
          <div className="m-auto  d-flex align-items-center justify-content-center">
            <Link
              className="nav-link active mt-3  text-primary"
              aria-current="page"
              to="/forgotpassword"
            >
              Forgot Password? 
            </Link>
            <span className="mt-3 mx-3">|</span>
            <Link
              className="nav-link active mt-3 "
              aria-current="page"
              to="/register"
            >
              Create Account
            </Link>
            </div>
        </form>
      </div>
    </>
  );
}
