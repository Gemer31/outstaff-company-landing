'use client'

import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 2 },
};

const items = [
  <div className="item" data-value="1">1</div>,
  <div className="item" data-value="2">2</div>,
  <div className="item" data-value="3">3</div>,
  <div className="item" data-value="4">4</div>,
  <div className="item" data-value="5">5</div>,
  <div className="item" data-value="5">6</div>,
];

export function Customers() {
  return <AliceCarousel
responsive={responsive}
ssrSilentMode={true}
    autoPlay
    autoPlayStrategy="all"
    autoPlayInterval={0}
    animationDuration={5000}
    animationType="fadeout"
    infinite
    touchTracking={false}
    disableDotsControls
    disableButtonsControls
    items={items}
  />
}
