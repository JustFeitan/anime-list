import React, {ComponentProps, ElementType, FC, ReactNode} from 'react';
import './DropDown.scss'

export interface DropDownProps extends ComponentProps<'div'>{
    isActive?: boolean;
    children: ReactNode;
    className?: string;
}

export const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(({children, isActive = true, className, ...props}, ref) => {

    return (
        <>
            <div className={isActive ? `dropdown__result--active ${className}` : 'dropdown__result'}
                 {...props}
                 ref={ref}
            >
                {children}
            </div>
        </>

    );
});


