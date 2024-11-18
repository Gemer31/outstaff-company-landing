interface IContentContainer {
  id?: string;
  type?: 'div' | 'article';
  children: React.ReactNode;
  className?: string;
  disableVerticalPaddings?: boolean;
  disableHorizontalPaddings?: boolean;
}

export function ContentContainer({
  children, className, id, type, disableVerticalPaddings, disableHorizontalPaddings
}: IContentContainer) {
  return type === 'article' ? (
    <article
      id={id || ''}
      className={`w-full max-w-screen-2xl ${disableHorizontalPaddings ? '' : 'px-2'} ${disableVerticalPaddings ? '' : 'py-6 md:py-12'} ${className || ''}`}
    >
      {children}
    </article>
  ) : (
    <div
      id={id || ''}
      className={`w-full max-w-screen-2xl ${disableHorizontalPaddings ? '' : 'px-2'} ${disableVerticalPaddings ? '' : 'py-6 md:py-12'} ${className || ''}`}
    >
      {children}
    </div>
  );
}
