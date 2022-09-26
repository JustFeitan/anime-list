import {RefObject, useEffect, useRef} from "react";
import {current} from "@reduxjs/toolkit";

export const useObserver = ( target: RefObject<HTMLElement>, canLoad: boolean, isLoading: boolean, callback: (...args: any) => void,) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const options = {
        threshold: 0
    }

    useEffect(() => {
        if (isLoading) return;
        if (!target.current) return;
        if (observer.current?.observe(target.current as Element)) observer.current?.disconnect();
        const cb = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        }
        observer.current = new IntersectionObserver(cb, options);
        observer.current?.observe(target.current as Element);
    }, [isLoading])



}
