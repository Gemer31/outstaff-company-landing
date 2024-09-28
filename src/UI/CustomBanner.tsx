import { convertToClass } from "@/utils/convert-to-class.util";
import Image from "next/image";

interface ICustomBannerProps {
    images: string[];
}

const bannerFrames = new Array(3).fill(null);

const GAP_VALUE = 14;
const GAP_REM_VALUE = 3.5;
const IMAGE_SIZE = 80
const DURATION_CONSTANT = 2000;
const ONE_REM = 16;

const hostClass = convertToClass([
    'custom-banner',
    'w-max',
    'flex',
    `gap-x-${GAP_VALUE}`,
]);

export function CustomBanner({ images }: ICustomBannerProps) {
    const iconsLength = images.length * IMAGE_SIZE;
    const gapsLength = images.length * GAP_REM_VALUE * ONE_REM;

    const fullFrameLength = iconsLength + gapsLength;
    const duration = images.length * DURATION_CONSTANT;

    const cssStartPositionValue = `translate(-${fullFrameLength}px)`;
    const cssEndPositionValue = `translate(-${2 * fullFrameLength}px)`;
    const cssBannerDurationValue = `${duration}ms`;

    return <>
        <div className="gap-x-14"></div>
        <section className="overflow-hidden">
            <div style={{ transform: cssStartPositionValue, '--bannerDuration': cssBannerDurationValue, '--finalOffset': cssEndPositionValue }} className={hostClass}>
                {
                    bannerFrames.map((_, index) => {
                        return <div key={index} className={`flex gap-x-${GAP_VALUE}`}>
                            {images.map((item, itemIndex) => {
                                return <Image key={itemIndex} src={item} width={IMAGE_SIZE} height={IMAGE_SIZE} alt={item} />
                            })}
                        </div>
                    })
                }
            </div>
        </section>
    </>





}