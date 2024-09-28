'use client'

import { convertToClass } from "@/utils/convert-to-class.util";
import Image from "next/image";

interface ICustomBannerProps {
    images: string[];
    speed: number;
}

const bannerFrames = new Array(3).fill(null);


const GAP_VALUE = 4;

const hostClass = convertToClass([
    'custom-banner',
    'overflow-hidden',
    'w-max',
    'flex',
    `mx-${GAP_VALUE}`,
]);


export function CustomBanner({ images }: ICustomBannerProps) {
    const iconsLength = images.length * 80;
    const gapsLength = images.length * 1 * 16;


    const fullFrameLength = iconsLength + gapsLength;
    const keyframeFinalOffset = 2*fullFrameLength;
    const speed = 20;
    const duration = fullFrameLength/speed;

    return <>
        <section style={{ transform: `translate(-${fullFrameLength}px)`, '--bannerDuration': `${duration}s`, '--finalOffset': `-${keyframeFinalOffset}px` }} className={hostClass}>
            {
                bannerFrames.map((_, index) => {
                    return <div key={index} className={`flex mx-${GAP_VALUE}`}>
                        {images.map((item, itemIndex) => {
                            return <Image key={itemIndex} src={item} width={80} height={80} alt={item} />
                        })}
                    </div>
                })
            }
        </section>
    </>





}