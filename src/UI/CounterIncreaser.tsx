'use client'

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const START_POINT_CONST = 0.5;

interface ICounterIncreaserProps {
    value: number;
    className?: string;
}

export function CounterIncreaser({ value, className }: ICounterIncreaserProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });
    const [current, setCurrent] = useState(0);
    const [startPoint, setStartPoint] = useState(0);

    const calculateTime = (v: number) => {
        // 10 / 500 = 2         S=U T
        // 11 / 500 = 2.2

        return v/startPoint;
    }

    useEffect(() => {
        if (!startPoint) {
            setStartPoint(value * START_POINT_CONST);
        }

        if (inView && startPoint && current < value) {
            const timerValue = calculateTime(current);

            setTimeout(() => setCurrent(prev => (prev + 1)), timerValue);
        }
    }, [inView, current, startPoint]);



    return <div className={className || ''} ref={ref}>{current}</div>
}