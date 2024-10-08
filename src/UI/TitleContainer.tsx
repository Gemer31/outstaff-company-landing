interface ITitleContainerProps {
  title: string;
  titleSlot?: React.ReactNode;
  children: React.ReactNode;
}

export function TitleContainer({ title, titleSlot, children }: ITitleContainerProps) {
  return <div className="w-full py-4">
    { titleSlot || <h2 className="mb-4 text-3xl font-bold text-center">{title}</h2>}
    {children}
  </div>
}
