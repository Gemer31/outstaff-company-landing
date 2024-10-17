'use client'

import './offset-block.css'
import { useInView } from 'react-intersection-observer';

interface IOffsetBlockProps {
  children: React.ReactNode;
}

export function OffsetBlock({ children }: IOffsetBlockProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return <div className="relative bg-custom-red-1 rounded-xl">
    <div
      ref={ref}
      className={'flex flex-col justify-center items-center gap-2 bg-custom-black-1 bottom-2 right-2 rounded-xl px-3 min-w-20 min-h-20 ' + (inView ? 'offset-block shadow-custom-red' : '')}>
      {children}
    </div>
  </div>
}
