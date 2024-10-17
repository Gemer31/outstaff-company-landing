interface IContentContainer {
  id?: string;
  type?: 'div' | 'article';
  children: React.ReactNode;
  className?: string;
}

export function ContentContainer({
  children, className, id, type,
}: IContentContainer) {
  return type === 'article' ? (
    <article
      id={id || ''}
      className={'w-full max-w-screen-2xl px-2 ' + (className || '')}
    >
      {children}
    </article>
  ) : (
    <div
      id={id || ''}
      className={'w-full max-w-screen-2xl px-2 ' + (className || '')}
    >
      {children}
    </div>
  );
}
