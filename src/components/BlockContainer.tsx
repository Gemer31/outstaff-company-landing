interface IBlockContainerProps {
  children: React.ReactNode;
  classname?: string;
}

export function BlockContainer({ classname, children }: IBlockContainerProps) {
  return <article className={`w-full flex justify-center py-4 md:py-10 ${classname || ''}`}>
    {children}
  </article>
}
