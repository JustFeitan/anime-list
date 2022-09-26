import {useCallback, useRef} from "react";

export const useDebounce = (cb: () => void, delay: number) => {
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debouncedCallback = useCallback(() => {
        if (ref.current) {
            clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => cb(), delay);

    }, [cb, delay])
    return debouncedCallback;
}
