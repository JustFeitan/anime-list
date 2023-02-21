import { MutableRefObject, useEffect } from "react";

export default function useOutsideClickHandler<T extends HTMLElement>(
    ref: MutableRefObject<T | null>,
    onOutsideClick: () => void
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
