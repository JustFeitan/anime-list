import { ComponentProps, ElementType, ReactNode } from "react";

type TypographyProps<T extends ElementType = ElementType> = {
    children: ReactNode;
    component?: T;
};

type Typography<T extends ElementType> = TypographyProps<T> &
    Omit<ComponentProps<T>, keyof TypographyProps>;

const defaultComponent = "p";

export default function Typography<
    T extends ElementType = typeof defaultComponent
>({ component, children, ...props }: Typography<T>) {
    const TagName = component || defaultComponent;
    return <TagName {...props}>{children}</TagName>;
}
