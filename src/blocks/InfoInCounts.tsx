import { ContentContainer } from '@/UI/ContentContainer';
import { CounterIncreaser } from '@/UI/CounterIncreaser';
import { ICounterBlock } from '@/models/common.model';

interface IInfoInCountsProps {
  counterBlocks: ICounterBlock[];
}

export function InfoInCounts({counterBlocks}: IInfoInCountsProps) {
  return <article className="py-10 w-full bg-custom-black-3 flex justify-center">
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
    </ContentContainer>
  </article>;
}
