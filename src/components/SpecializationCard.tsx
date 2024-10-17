import { ISpecializationCard } from "@/models/common.model"
import { useTranslations } from "next-intl"
import Image from "next/image";
import { SpecializationCardSize } from '@/models/enums';

interface ISpecializationCardProps {
    data: ISpecializationCard,
    size: SpecializationCardSize,
}

const POSITION_CLASS = new Map<string, string>([
    [SpecializationCardSize.LARGE, 'grid-cols-2 2sm:grid-cols-3 2xl:grid-cols-6'],
    [SpecializationCardSize.NORMAL, 'grid-cols-2 2xl:grid-cols-4'],
])

export function SpecializationCard({data, size}: ISpecializationCardProps) {
    const t = useTranslations();

    return <section className="relative w-4/12 bg-custom-black-2 flex flex-col justify-between gap-y-4 grow rounded-lg p-4 overflow-hidden">
        <h3 className="text-center text-xl font-bold">{t(data.title)}</h3>
        <div className={`grid ${POSITION_CLASS.get(size)} justify-items-center items-center gap-8`}>
            {
                data.icons.map((item, index) => {
                    return <Image key={index} src={`/icons/specializations/${item}.svg`} width={50} height={50} alt={item}/>
                })
            }
        </div>
        <span className="text-sm">{data.description}</span>
        <Image className="absolute bottom-0 right-0" src="/icons/triangle.svg" width={40} height={40} alt="Preview" />
    </section>
}
