interface IContentContainer {
  id?: string;
  type?: 'div' | 'article';
  children: React.ReactNode;
  className?: string;
  disablePaddings?: boolean;
}

export function ContentContainer({
  children, className, id, type, disablePaddings,
}: IContentContainer) {
  return type === 'article' ? (
    <article
      id={id || ''}
      className={`w-full max-w-screen-2xl px-2 ${disablePaddings ? '' : 'py-6 md:py-12'} ${className || ''}`}
    >
      {children}
    </article>
  ) : (
    <div
      id={id || ''}
      className={`w-full max-w-screen-2xl px-2 ${disablePaddings ? '' : 'py-6 md:py-12'} ${className || ''}`}
    >
      {children}
    </div>
  );
}
