import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <div className="container-fluid py-4 mb-2">
        <div className="row g-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <img
                height={450}
                src={require("../../Assets/images/slider-image-1.jpeg")}
                alt=""
                className="w-100"
              />
              <img
                height={450}
                className="w-100"
                src={require("../../Assets/images/slider-image-2.jpeg")}
                alt=""
              />
              <img
                height={450}
                className="w-100"
                src={require("../../Assets/images/slider-image-3.jpeg")}
                alt=""
              />
            </Slider>
          </div>
          <div className="col-md-3 smail-photo">
            <img
              height={225}
              className="w-100"
              src={require("../../Assets/images/grocery-banner-2.jpeg")}
              alt=""
            />
            <img
              height={225}
              className="w-100"
              src={require("../../Assets/images/slider-2.jpeg")}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
