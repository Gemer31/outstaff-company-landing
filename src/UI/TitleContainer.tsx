interface ITitleContainerProps {
  title: string;
  children: React.ReactNode;
}

export function TitleContainer({ title, children }: ITitleContainerProps) {
  return <div className="w-full py-4">
    <h2 className="mb-4 text-3xl font-bold text-center">{title}</h2>
    {children}
  </div>
}
