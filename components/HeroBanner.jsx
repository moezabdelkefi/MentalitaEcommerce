import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import { urlFor } from "../lib/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBanner = ({ heroBanner }) => {
  const settings = {
    dots: true, // Set to true to enable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="hero-banner-container">
      <Slider {...settings}>
        {heroBanner.images.map((image, index) => (
          <div key={index} className="slide">
            <img
              src={urlFor(image)}
              alt={`Slide ${index}`}
              className="slide-image"
            />
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .hero-banner-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
        }
        .slide {
          position: relative;
          width: 100%;
          height: auto;
        }
        .slide-image {
          margin-top: 50px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.5);
          padding: 10px 20px;
          border-radius: 5px;
        }
        .slide-button {
          background-color: #ff6347;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .slide-button:hover {
          background-color: #ff4500;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .slide {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .slide {
            height: 300px;
          }
          .slide-image {
            margin-top: 30px;
          }
        }

        @media (max-width: 480px) {
          .slide {
            height: 140px;
          }
          .slide-image {
            margin-top: 20px;
          }
          .slide-content {
            bottom: 10px;
            left: 10px;
            padding: 5px 10px;
          }
          .slide-button {
            padding: 5px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
