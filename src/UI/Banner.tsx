import Image from 'next/image';

interface IBannerProps {
    images: { id: string, image: string }[];
    speed: number
}

const frames = new Array(3).fill(null);

export function Banner({ images, speed = 5000 }: IBannerProps) {
    return (
        <div className="inner">
            <div className="wrapper">
                {
                    frames.map((_, index) => {
                        return <section key={index} style={{ "--speed": `${speed}ms` }}>
                            {images.map(({ id, image }) => (
                                <div className="image" key={id}>
                                    <Image className="banner-img" src={image} alt={image} width={120} height={80}/>
                                </div>
                            ))}
                        </section>
                    })
                }
            </div>
        </div>
    );
};
