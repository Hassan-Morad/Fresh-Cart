import React from "react";


export default function Footer() {
  return (
    <footer className="bg-main-light mt-auto  py-5 mt-auto">
      <div className="container-sm">
        <h3 className="h5 fw-semibold mb-3">Get the FreshCart App</h3>
        <p>We will sent you a link, open it on your phone </p>
        <div className="row g-4 justify-content-between align-items-center pb-3 border-bottom border-opacity-25 border-dark">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Your Email"
            />
          </div>
          <div className="col-md-3 text-end">
            <button className="btn bg-main text-light w-100">
              Share App Link
            </button>
          </div>
        </div>
        <div className="text-center mt-4 ">
         <p>Copy Right 2023 © By Hassan Morad All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
