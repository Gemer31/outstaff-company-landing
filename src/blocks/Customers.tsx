'use client'

import { Banner } from '@/UI/Banner';
import { ContentContainer } from '@/UI/ContentContainer';
import { TitleContainer } from '@/UI/TitleContainer';

const images = [
  "/companies/airbnb.svg",
  "/companies/bmw.svg",
  "/companies/google.svg",
  "/companies/spotify.svg",
  "/companies/tinder.svg",
].map((image) => ({
  id: crypto.randomUUID(),
  image
}));

export function Customers() {
  return <section className='w-full bg-main-black-1-gradient flex justify-center'>
    <ContentContainer>
      <TitleContainer title='Clients'>
        <Banner images={images} speed={5000} />
      </TitleContainer>
    </ContentContainer>
  </section>
}
