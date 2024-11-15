import { Link } from '@/i18n/routing';
import { convertToClass } from '@/utils/convert-to-class.util';

interface ITitleContainerProps {
  className?: string;
  title: string;
  navLink?: {
    title: string;
    url: string;
  };
  children: React.ReactNode;
}

const titleClass = convertToClass([
  'text-2xl lg:text-3xl lg:text-4xl',
  'font-bold',
  'text-center'
]);

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
        <h2 className={titleClass}>{title}</h2>

        {navLink ?
          <Link className="hover:underline text-custom-red-1" href={navLink.url}>{navLink.title}</Link> : <></>}
      </div>
      {children}
    </div>
  );
}
