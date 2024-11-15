interface IBlockContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function BlockContainer({ className, children }: IBlockContainerProps) {
  return <section className={`w-full flex justify-center ${className || ''}`}>
    {children}
  </section>
}
