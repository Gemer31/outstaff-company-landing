'use client'

import Slider from "react-slick";
import Image from 'next/image';
import React from 'react';

interface IMultipleItemsProps {
  images: string[];
}

export function InfinitySlider({images}: IMultipleItemsProps) {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "ease",
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
          images.map((item, itemIndex) => {
            return <Image className="w-[80px] h-[80px]" key={itemIndex} src={item} width={80} height={80} alt={item} />
          })
        }
      </Slider>
    </div>
  );
}
