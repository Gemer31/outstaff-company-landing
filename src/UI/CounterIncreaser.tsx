'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface ICounterIncreaserProps {
    value: number;
    className?: string;
}

export function CounterIncreaser({ value, className }: ICounterIncreaserProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    return <div ref={ref} className={className}>
        {
            inView ? <CountUp end={value} duration={1}/> : 0
        }
    </div>
}
