import React, {FC} from 'react';
import './DropdownMenu.scss';
import {DropDown, DropDownProps} from "../DropDown/DropDown";




const DropdownMenu = React.forwardRef<HTMLDivElement, DropDownProps>(({children, isActive = true}, ref) => {
    return (
        <DropDown isActive={isActive} className='dropdown-menu' ref={ref}>
            {children}
        </DropDown>
    );
});

export default DropdownMenu;
