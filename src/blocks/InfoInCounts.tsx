import { ContentContainer } from '@/UI/ContentContainer';
import { CounterIncreaser } from '@/UI/CounterIncreaser';
import Image from 'next/image';
import { ICounterBlock } from '@/models/common.model';

interface IInfoInCountsProps {
  counterBlocks: ICounterBlock[];
}

export function InfoInCounts({counterBlocks}: IInfoInCountsProps) {
  return <article className="py-10 w-full bg-custom-black-1 flex justify-center">
    <ContentContainer className="flex justify-around relative">
      {
        counterBlocks?.map((item, index) => {
            return <section key={index}>
              <div className="flex items-center">
                <CounterIncreaser className="text-6xl" value={item.number}/>
                <div className="text-6xl">{item.numberPostfix}</div>
              </div>
              <div className="text-sm">{item.text}</div>
            </section>;
          })
      }
      <Image className="rotate-180 absolute top-0 left-0" src="/icons/triangle.svg" width={20} height={20}
             alt="Preview"/>
      <Image className="absolute bottom-0 right-0" src="/icons/triangle.svg" width={40} height={40} alt="Preview"/>
    </ContentContainer>
  </article>;
}
