import { ContentContainer } from "@/UI/ContentContainer";
import { CounterIncreaser } from "@/UI/CounterIncreaser";
import Image from "next/image";

const INFO_IN_COUNTS: { count: number, mainPostfix?: string; secondary: string }[] = [
    {
        count: 16,
        secondary: 'лет на рынке'
    },
    {
        count: 200,
        mainPostfix: '+',
        secondary: 'сотрудников'
    },
    {
        count: 50,
        mainPostfix: '+',
        secondary: 'постоянных клиентов'
    },
];

export function InfoInCounts() {
    return <article className="py-10 w-full bg-custom-black-1 flex justify-center">
        <ContentContainer className="flex justify-around relative">
            {
                INFO_IN_COUNTS.map((item, index) => {
                    return <section key={index}>
                        <div className="flex items-center">
                            <CounterIncreaser className="text-6xl" value={item.count} />
                            <div className="text-6xl">{item.mainPostfix}</div>
                        </div>
                        <div className="text-sm">{item.secondary}</div>
                    </section>
                })
            }
            <Image className="rotate-180 absolute top-0 left-0" src="/icons/triangle.svg" width={20} height={20} alt="Preview" />
            <Image className="absolute bottom-0 right-0" src="/icons/triangle.svg" width={40} height={40} alt="Preview" />
        </ContentContainer>
    </article>
}