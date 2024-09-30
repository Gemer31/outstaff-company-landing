import { IConfig } from "@/models/common.model";
import { ContactLinkType } from "@/models/enums";
import { ContactLink } from "@/UI/ContactLink";
import { ContentContainer } from "@/UI/ContentContainer";
import Image from 'next/image';

interface IFooterProps {
  config: IConfig;
}

export function Footer({ config }: IFooterProps) {
  return <footer className="py-6 flex flex-col items-center bg-custom-black-2">
    <ContentContainer className="flex justify-around items-center relative">
      <Image className="absolute top-0 left-0" src="/icons/triangle2.svg" width={60} height={60} alt="Preview" />
      <Image className="absolute bottom-2 right-6" src="/icons/rhomb.svg" width={60} height={60} alt="Preview" />

      <ContactLink type={ContactLinkType.PHONE} value={config.phone} icon={true} />
      <div className='w-[200px] h-[100px] rounded-sm flex items-center overflow-hidden'>
        <Image src="/icons/logo-transparent.svg" width={200} height={200} alt="logo" />
      </div>
      <ContactLink type={ContactLinkType.MAIL} value={config.email} icon={true} />
    </ContentContainer>
    <ContentContainer className="flex justify-center bg-gray">
      © Increment, 2003–2024
    </ContentContainer>
  </footer>
}
