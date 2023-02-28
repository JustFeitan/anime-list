import { useCallback, useRef } from "react";

export function useDebounceCallback<T>(
    callback: (...args: T[]) => void,
    delay: number
) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    return useCallback(
        async (...args: T[]) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = await setTimeout(async () => {
                await callback(...args);
                console.log(args);
            }, delay);
        },
        [callback, delay]
    );
}
