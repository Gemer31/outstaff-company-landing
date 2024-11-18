import { Link } from '@/i18n/routing';
import { TitleContainerHeadline } from '@/UI/TitleContainerHeadline';

interface ITitleContainerProps {
  className?: string;
  title: string;
  navLink?: {
    title: string;
    url: string;
  };
  children: React.ReactNode;
}

export function TitleContainer({
                                 title,
                                 navLink,
                                 children,
                                 className,
                               }: ITitleContainerProps) {
  return (
    <div className={'w-full ' + (className || '')}>
      <div
        className={
          'mb-4 flex items-center ' +
          (navLink ? 'justify-between' : 'justify-center')
        }
      >
        <TitleContainerHeadline>{title}</TitleContainerHeadline>

        {navLink ?
          <Link className="hover:underline text-custom-red-1" href={navLink.url}>{navLink.title}</Link> : <></>}
      </div>
      {children}
    </div>
  );
}
