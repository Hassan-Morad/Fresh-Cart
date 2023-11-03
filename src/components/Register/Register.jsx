import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
export default function Register() {
 
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const timeoutRef = useRef(null);
  async function registerSubmet(values) {
    setError(null);
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(false);
      setError(null);
      setSuccess('Account has created successfully')
      timeoutRef.current = setTimeout(() => { // Use the timeoutRef
        navigate("/login");
      }, 1000);
    }
  }
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clear the timeout when the component unmounts
    };
  }, []); 
  let phoneRehExp = /^01[0-9]{9}$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum length is 3")
      .max(20, "Maximum length is 20")
      .required("Name is required"),
    email: Yup.string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z]).{6,}$/, "Password not valid")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Repassword does not match")
      .required("Repassword is required"),
    phone: Yup.string()
      .matches(phoneRehExp, "Phone not valid")
      .required("Phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmet,  
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        {success ? <div className="alert alert-success">{success}</div> : ""}
        <h2>Register Now </h2>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <label className="mt-2" htmlFor="name">
            Name :
          </label>
          <input
            className="form-control  "
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert-danger alert py-1 mt-1">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
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
          <label className="mt-2" htmlFor="repassword">
            Repassword :
          </label>
          <input
            className="form-control "
            id="repassword"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert-danger alert py-1 mt-1">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <label className="mt-2" htmlFor="phone">
            Phone :
          </label>
          <input
            className="form-control  "
            id="phone"
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert-danger alert py-1 mt-1">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
