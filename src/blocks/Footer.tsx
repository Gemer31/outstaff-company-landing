import { IConfig } from "@/models/common.model";
import { ContentContainer } from "@/UI/ContentContainer";
import Image from 'next/image';

interface IFooterProps {
  config: IConfig;
}

export function Footer({ config }: IFooterProps) {
  return <footer className="py-6 flex flex-col items-center bg-main-black-1">
    <ContentContainer className="flex justify-between items-center">
      <div>{config.phone}</div>
      <Image src="/icons/logo-transparent.svg" width={200} height={200} />
      <div>{config.email}</div>
    </ContentContainer>
    <ContentContainer className="flex justify-center bg-gray">
      © Increment, 2003–2024
    </ContentContainer>
  </footer>
}
