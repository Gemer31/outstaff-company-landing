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
                                    <img src={image} alt={id} />
                                </div>
                            ))}
                        </section>
                    })
                }
            </div>
        </div>
    );
};
