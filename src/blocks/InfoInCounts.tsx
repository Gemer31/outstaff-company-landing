import { ContentContainer } from "@/UI/ContentContainer";
import Image from "next/image";

const INFO_IN_COUNTS: { main: string, secondary: string }[] = [
    {
        main: '16',
        secondary: 'лет на рынке'
    },
    {
        main: '200+',
        secondary: 'сотрудников'
    },
    {
        main: '50+',
        secondary: 'постоянных клиентов'
    },
];

export function InfoInCounts() {
    return <article className="py-6 w-full bg-custom-black-1 flex justify-center">
        <ContentContainer className="flex justify-around relative">
            {
                INFO_IN_COUNTS.map((item) => {
                    return <section>
                        <div className="text-6xl">{item.main}</div>
                        <div className="text-sm">{item.secondary}</div>
                    </section>
                })
            }
            <Image className="rotate-180 absolute top-0 left-0" src="/icons/triangle.svg" width={20} height={20} alt="Preview" />
            <Image className="absolute bottom-0 right-0" src="/icons/triangle.svg" width={40} height={40} alt="Preview" />
        </ContentContainer>
    </article>
}