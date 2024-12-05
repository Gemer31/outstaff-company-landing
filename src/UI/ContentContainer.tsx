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
      {...(id ? { id } : {})}
      style={{ position: 'relative' }}
      className={`w-full max-w-screen-2xl ${disableHorizontalPaddings ? '' : 'px-2'} ${disableVerticalPaddings ? '' : 'py-10 md:py-14'} ${className || ''}`}
    >
      {children}
    </article>
  ) : (
    <div
      {...(id ? { id } : {})}
      style={{ position: 'relative' }}
      className={`w-full max-w-screen-2xl ${disableHorizontalPaddings ? '' : 'px-2'} ${disableVerticalPaddings ? '' : 'py-10 md:py-14'} ${className || ''}`}
    >
      {children}
    </div>
  );
}
