'use client'

import { ContentContainer } from '@/UI/ContentContainer';
import { handleInView } from '@/utils/intersection.util';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';



export function MainPreview() {
    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: true,
    });
    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: true,
    });
    const { ref: ref3, inView: inView3 } = useInView({
        triggerOnce: true,
    });

    return <article className="w-full flex justify-center bg-custom-black-1 pt-4 pb-10 relative">
        <ContentContainer className='flex justify-between relative'>
            <div className="z-10 absolute w-full h-full inner-shadow inner-shadow-vertical flex justify-center items-center text-3xl">
                <div ref={ref3} className={'max-w-2xl text-center animate__animated  animate__pulse'}>
                    <span className="font-bold">Increment</span> - Интегратор digital-решений для бизнеса и государства
                </div>
            </div>
            <Image className="rotate-180" src="/images/background.png" width={500} height={500} alt="Preview" />
            <Image src="/images/background.png" width={500} height={500} alt="Preview" />
        </ContentContainer>
    </article>
}