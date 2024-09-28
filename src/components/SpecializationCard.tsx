import { ISpecializationCard } from "@/models/common.model"
import { useTranslations } from "next-intl"
import Image from "next/image";

interface ISpecializationCardProps {
    data: ISpecializationCard
}

export function SpecializationCard({data}: ISpecializationCardProps) {
    const t = useTranslations();

    return <section className="w-4/12 border-custom-red-2 flex flex-col justify-between gap-y-4 grow rounded-lg border-2 p-4">
        <h3 className="text-center text-xl font-bold">{t(data.title)}</h3>
        <div className="flex flex-wrap justify-around items-center gap-8">
            {
                data.icons.map((item) => {
                    return <Image src={item.path} width={50} height={50} alt={item.alt}/>
                })
            }
        </div>
        <span className="text-sm">{data.description}</span>
    </section>
}