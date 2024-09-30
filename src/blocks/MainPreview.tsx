'use client'

import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';


export function MainPreview() {
    return <article className="w-full flex justify-center bg-custom-black-1 pt-4 pb-10 relative">
        <ContentContainer className='flex justify-between relative'>
            <div className="z-10 absolute w-full h-full inner-shadow inner-shadow-vertical flex justify-center items-center text-3xl">
                <div className={'max-w-2xl text-center animate__animated  animate__pulse'}>
                    <span className="font-bold">Increment</span> - Интегратор digital-решений для бизнеса и государства
                </div>
            </div>
            <Image className="rotate-180" src="/images/background.png" width={500} height={500} alt="Preview" />
            <Image src="/images/background.png" width={500} height={500} alt="Preview" />
        </ContentContainer>
    </article>
}