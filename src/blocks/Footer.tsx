import { IConfig } from '@/models/common.model';
import { ContactLinkType } from '@/models/enums';
import { ContactLink } from '@/UI/ContactLink';
import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';
import { OffsetBlock } from '@/UI/offset-block/OffsetBlock';
import { convertToClass } from '@/utils/convert-to-class.util';

interface IFooterProps {
  config: IConfig;
}

const footContainerClass = convertToClass([
  'px-2',
  'pb-4',
  'gap-y-4',
  'flex flex-col-reverse md:grid',
  'grid-cols-3',
  'items-center',
  'justify-items-center'
]);

export function Footer({config}: IFooterProps) {
  return <footer className="pt-10 pb-4 flex flex-col items-center bg-custom-black-2">
    <ContentContainer disableVerticalPaddings className={footContainerClass}>
      <section
        className="flex-1 text-center md:text-left text-xs"
        dangerouslySetInnerHTML={{ __html: config.companyInfo || "" }}
      ></section>

      <Image className="hidden md:block" src="/images/logo-red.png" width={100} height={100} alt="logo"/>

      <section className="flex justify-self-end gap-x-6">
        <OffsetBlock>
          <ContactLink
            valueVisible={false}
            type={ContactLinkType.TELEGRAM}
            value={config.telegramLink}
          />
        </OffsetBlock>
        <OffsetBlock>
          <ContactLink type={ContactLinkType.MAIL} value={config.email}/>
        </OffsetBlock>
      </section>
    </ContentContainer>

    <ContentContainer disableVerticalPaddings className="flex justify-center bg-gray text-xs py-2">
      © Increment, 2024
    </ContentContainer>
  </footer>;
}
