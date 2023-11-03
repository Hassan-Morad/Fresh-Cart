import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';

export default function CategoriesSlider() {
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    slidesToShow: 6, // Default value for 'md' screens
  });

  // Update slider settings on window resize
  const handleResize = () => {
    if (window.innerWidth >= 800) {
      setSliderSettings({ ...sliderSettings, slidesToShow: 6 });
    } 
    else if (window.innerWidth >= 650) {
      setSliderSettings({ ...sliderSettings, slidesToShow: 5 });
    } else {
      setSliderSettings({ ...sliderSettings, slidesToShow: 3 });
    }
  };

  useEffect(() => {
    // Add a window resize event listener
    window.addEventListener('resize', handleResize);

    // Initial settings
    handleResize();

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data } = useQuery('categories', () => getCategories());

  return (
    <div className="container-fluid overflow-hidden">
      <Slider {...sliderSettings}>
        {data?.data?.data.map((ele, idx) => (
          <div key={idx}>
            <img height={250} className='w-100 mb-1' src={ele.image} alt='' />
            <h5>{ele.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}
