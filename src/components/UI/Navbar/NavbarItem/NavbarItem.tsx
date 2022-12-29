import React, {ComponentProps, FC} from 'react';
import {Link, LinkProps, NavLink, NavLinkProps} from "react-router-dom";
import './NavbarItem.scss';

interface NavbarItem extends NavLinkProps{
}

const NavbarItem: FC<NavbarItem> = ({children, className, to, ...props}) => {
    return (
        <NavLink
            className={({isActive}) => isActive ? `navbar__link navbar__link--active ${className}` : `navbar__link ${className}`}
            to={to}
            {...props}
        >
            {children}
        </NavLink>
    );
};

export default NavbarItem;
