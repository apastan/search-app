import {useRef} from 'react';

export const UseFetchDelay = (defaultDelay?: number) => {
    const AVAILABLE_DELAYS_VALUES = [10, 20, 30, 40, 50, 75, 100, 125, 150, 200];
    const DEFAULT_DELAY = defaultDelay || 20;

    if (defaultDelay && !AVAILABLE_DELAYS_VALUES.includes(defaultDelay)) {
        AVAILABLE_DELAYS_VALUES.push(defaultDelay)
        AVAILABLE_DELAYS_VALUES.sort((a, b) => a - b)
    }

    const fetchDelayRef = useRef(DEFAULT_DELAY);
    const onDelayChange = (delay: number) => {
        fetchDelayRef.current = delay;
    };

    return {
        fetchDelay: fetchDelayRef.current,
        onDelayChange,
        delays: AVAILABLE_DELAYS_VALUES
    };
};