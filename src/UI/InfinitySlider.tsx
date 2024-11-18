'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import React from 'react';

interface IMultipleItemsProps {
  images: string[];
  slidesToShow?: number;
  autoplay?: boolean;
}

export function InfinitySlider({images, slidesToShow, autoplay}: IMultipleItemsProps) {
  const settings = {
    infinite: true,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: 1,
    autoplay,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: 'ease',
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
          images.map((item, itemIndex) => {
            return <div key={itemIndex}>
              <div className="hidden md:flex justify-center">
                <Image className="w-24 h-24" src={item} width={1000} height={1000} alt={item}/>
              </div>
              <div className="hidden sm:flex md:hidden justify-center">
                <Image className="w-20 h-20" src={item} width={1000} height={1000} alt={item}/>
              </div>
              <div className="flex sm:hidden justify-center">
                <Image className="w-16 h-16" src={item} width={1000} height={1000} alt={item}/>
              </div>
            </div>;
          })
        }
      </Slider>
    </div>
  );
}
