import React, {ComponentProps, FC} from 'react';
import './Navbar.scss';

interface NavbarProps extends ComponentProps<'div'>{
    children: JSX.Element | JSX.Element[];
}

const Navbar: FC<NavbarProps> = ({children, className, ...props}) => {
    return (
        <nav className={`navbar ${className}`} {...props}>
            {children}
        </nav>
    );
};

export default Navbar;
