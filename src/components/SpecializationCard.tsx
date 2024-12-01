import { ISpecializationCard } from "@/models/common.model"
import { useTranslations } from "next-intl"
import Image from "next/image";
import { SpecializationCardSize } from '@/models/enums';
import { convertToClass } from '@/utils/convert-to-class.util';

interface ISpecializationCardProps {
    data: ISpecializationCard,
    size: SpecializationCardSize,
}

const POSITION_CLASS = new Map<string, string>([
    [SpecializationCardSize.LARGE, 'grid-cols-2 2sm:grid-cols-3 2xl:grid-cols-6'],
    [SpecializationCardSize.NORMAL, 'grid-cols-2 2xl:grid-cols-4'],
])

const hostClass = convertToClass([
  'relative',
  'w-4/12',
  'bg-custom-black-2',
  'flex',
  'flex-col',
  'justify-between',
  'gap-y-2 sm:gap-y-4',
  'grow',
  'rounded-lg',
  'p-4',
  'overflow-hidden'
])

export function SpecializationCard({data, size}: ISpecializationCardProps) {
    const t = useTranslations();

    return <section className={hostClass}>
        <h3 className="text-center text-xs 2xs:text-lg sm:text-xl font-bold break-words">{t(data.title)}</h3>
        <div className={`grid ${POSITION_CLASS.get(size)} justify-items-center items-center gap-4 sm:gap-8`}>
            {
                data.icons.map((item, index) => {
                    return <Image
                      key={index}
                      src={`/icons/specializations/${item}.svg`}
                      width={50}
                      height={50}
                      alt={item}
                    />
                })
            }
        </div>
        <span className="hidden sm:inline text-xs sm:text-sm break-words">{t(data.description)}</span>
        <Image className="absolute bottom-0 right-0" src="/icons/triangle.svg" width={30} height={30} alt="Preview" />
    </section>
}
