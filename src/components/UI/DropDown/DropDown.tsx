import React, {ComponentProps, ElementType, FC, ReactNode} from 'react';
import './DropDown.scss'

export interface DropDownProps {
    isActive?: boolean;
    children: ReactNode;
    className?: string;
}

export const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(({children, isActive, className}, ref) => {
    return (
        <>
            <div className={isActive ? `dropdown__result--active ${className}` : 'dropdown__result'}
                 ref={ref}
            >
                {children}
            </div>
        </>

    );
});


