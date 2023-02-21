import React, { ComponentProps } from "react";
import "./DropdownMenu.scss";
import { DropDown, DropDownProps } from "../DropDown/DropDown";

interface DropDownMenuProps extends ComponentProps<"div"> {
    className: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropDownProps>(
    ({ children, isActive, className, ...props }, ref) => {
        return (
            <DropDown
                isActive={isActive}
                className={
                    className ? `dropdown-menu ${className}` : "dropdown-menu"
                }
                {...props}
                ref={ref}
            >
                {children}
            </DropDown>
        );
    }
);

export default DropdownMenu;
