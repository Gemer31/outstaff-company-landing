import { IConfig } from '@/models/common.model';
import { ContactLinkType } from '@/models/enums';
import { ContactLink } from '@/UI/ContactLink';
import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';
import { OffsetBlock } from '@/UI/offset-block/OffsetBlock';

interface IFooterProps {
  config: IConfig;
}

export function Footer({config}: IFooterProps) {
  return <footer className="pt-6 pb-2 flex flex-col items-center bg-custom-black-2">
    <ContentContainer className="grid grid-cols-3 items-center justify-items-center pb-4">
      <section
        className="flex-1 text-xs"
        dangerouslySetInnerHTML={{ __html: config.companyInfo || "" }}
      ></section>

      <Image src="/images/logo-red.png" width={100} height={100} alt="logo"/>

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

    <ContentContainer className="flex justify-center bg-gray text-xs">
      © Increment, 2003–2024
    </ContentContainer>
  </footer>;
}
