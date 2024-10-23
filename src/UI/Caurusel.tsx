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
              <div className="flex justify-center">
                <Image className="w-[100px] h-[100px]" src={item} width={1000} height={1000} alt={item}/>
              </div>
            </div>;
          })
        }
      </Slider>
    </div>
  );
}
