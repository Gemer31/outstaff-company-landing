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
    <ContentContainer className="flex justify-between items-center">
      <section className="w-[200px] h-[100px] rounded-sm flex items-center overflow-hidden">
        <Image src="/icons/logo-transparent.svg" width={200} height={200} alt="logo"/>
      </section>


      <section className="flex gap-x-6">
        {/*<OffsetBlock>*/}
        {/*  <Image src="/icons/phone.svg" width={30} height={30} alt="Phone Icon"/>*/}
        {/*  <ContactLink type={ContactLinkType.PHONE} value={config.phone}/>*/}
        {/*</OffsetBlock>*/}
        <OffsetBlock>
          <Image src="/icons/mail.svg" width={30} height={30} alt="Email Icon"/>
          <ContactLink type={ContactLinkType.MAIL} value={config.email}/>
        </OffsetBlock>
      </section>
    </ContentContainer>

    <ContentContainer className="flex justify-center bg-gray text-xs">
      © Increment, 2003–2024
    </ContentContainer>
  </footer>;
}
