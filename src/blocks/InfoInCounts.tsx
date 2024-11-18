import { ContentContainer } from '@/UI/ContentContainer';
import { CounterIncreaser } from '@/UI/CounterIncreaser';
import { ICounterBlock } from '@/models/common.model';
import { BlockContainer } from '@/components/BlockContainer';

interface IInfoInCountsProps {
  counterBlocks: ICounterBlock[];
}

export function InfoInCounts({counterBlocks}: IInfoInCountsProps) {
  return <BlockContainer className="bg-custom-black-3">
    <ContentContainer className="flex flex-wrap gap-x-8 gap-y-4 justify-around relative">
      {
        counterBlocks?.map((item, index) => {
          return <article className="text-center" key={index}>
            <div className="w-full flex justify-center 2xs:justify-start">
              <div className="flex items-center text-5xl md:text-6xl">
                <CounterIncreaser value={item.number}/>
                <div>{item.numberPostfix}</div>
              </div>
            </div>
            <div className="text-sm md:text-base">{item.text}</div>
          </article>;
        })
      }
    </ContentContainer>
  </BlockContainer>;
}
