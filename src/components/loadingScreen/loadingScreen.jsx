import React from 'react';
import { Circles } from 'react-loader-spinner';
import './loadingScreen.module.css'

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
    <div className="loading-screen d-flex align-items-center justify-content-center">
       <Circles
              height="70"
              width="65"
              color="green"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
    </div>
    </div>
  );
};

export default LoadingScreen;