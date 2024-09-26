import { IConfig } from "@/models/common.model";
import { ContentContainer } from "@/UI/ContentContainer";
import { transformPhoneUtil } from "@/utils/transform-phone.util";
import Image from 'next/image';
import Link from 'next/link';

interface IFooterProps {
  config: IConfig;
}

export function Footer({ config }: IFooterProps) {
  return <footer className="py-6 flex flex-col items-center bg-custom-black-1">
    <ContentContainer className="flex justify-around items-center">
      <Link className="hover:text-custom-red-2 duration-200 transition-colors" href={'tel:' + transformPhoneUtil(config?.phone || '')}>{config.phone}</Link>
      <div className='w-[200px] h-[100px] rounded-sm flex items-center overflow-hidden'>
        <Image src="/icons/logo-transparent.svg" width={200} height={200} alt="logo" />
      </div>
      <Link className="hover:text-custom-red-2 duration-200 transition-colors" href={'mailto:' + config.email}>{config.email}</Link>
    </ContentContainer>
    <ContentContainer className="flex justify-center bg-gray">
      © Increment, 2003–2024
    </ContentContainer>
  </footer>
}
