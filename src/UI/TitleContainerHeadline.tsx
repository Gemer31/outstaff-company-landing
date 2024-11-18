import { convertToClass } from '@/utils/convert-to-class.util';

interface ITitleContainerHeadlineProps {
  children: React.ReactNode;
}

const titleContainerTitleClass = convertToClass([
  'text-2xl lg:text-3xl lg:text-4xl',
  'font-bold',
  'text-center',
  'z-20',
  'relative'
]);

export function TitleContainerHeadline({children}: ITitleContainerHeadlineProps) {
  return <h2 className={titleContainerTitleClass}>{children}</h2>
}
