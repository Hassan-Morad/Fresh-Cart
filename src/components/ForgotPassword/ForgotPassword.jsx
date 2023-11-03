import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import LoadingScreen from '../loadingScreen/loadingScreen';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  let navigate = useNavigate();
  const timeoutRef = useRef(null);
  async function submitForgotPass(values){
    setLoading(true);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values,
      );
      setLoading(false);
      if (data.statusMsg === "success") {
        setError(null);
        setSuccess(data.message);
        timeoutRef.current = setTimeout(() => { // Use the timeoutRef
          navigate('/resetcode');
        }, 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
      setSuccess(null);
    }}
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitForgotPass,
  });
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clear the timeout when the component unmounts
    };
  }, []);
  return( 
    <>
     <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Forget Password Page" />
      </Helmet>
    <div className="container rounded-3 shadow bg-main-light my-4 px-2 py-4">
      {isLoading && <LoadingScreen />}
      <h2 className="text-center">Forgot Password</h2>
      <form
        method="post"
        onSubmit={formik.handleSubmit}
        className="w-75 m-auto"
      >
        <label htmlFor="email" className="fw-semibold mt-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control my-3"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-light"
        >
          Next
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
  )
}
