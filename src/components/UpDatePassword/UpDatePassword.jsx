import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { Helmet } from "react-helmet";

export default function UpDatePassword() {
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: submitUpdatePass,
  });

  async function submitUpdatePass(values) {
    setLoading(true);

    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (data.message === "success") {
        setError(null);
        setSuccess("The password has been changed successfully");
      }
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error); 
      setError(error.response.data.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  return (
    <>
       <Helmet>
        <title>Update Password</title>
        <meta name="description" content="Forget Password Page" />
      </Helmet>
      <div className="container rounded-3 shadow bg-main-light my-4 px-2 py-4">
        {isLoading && <LoadingScreen />}
        <h2 className="text-center">Update User Password</h2>
        <form
          method="post"
          onSubmit={formik.handleSubmit}
          className="w-75 m-auto"
        >
          <label htmlFor="currentPassword" className="fw-semibold mt-3">
            Current Password:
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            className="form-control my-3"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="password" className="fw-semibold mt-3">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control my-3"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="rePassword" className="fw-semibold mt-3">
            RePassword:
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control my-3"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-light"
          >
            Submit
          </button>
          {Error ? (
            <div className="alert mt-3 w-75 m-auto text-center alert-danger">
              {Error}
            </div>
          ) : (
            ""
          )}
          {Success ? (
            <div className="alert mt-3 w-75 m-auto text-center alert-success">
              {Success}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
