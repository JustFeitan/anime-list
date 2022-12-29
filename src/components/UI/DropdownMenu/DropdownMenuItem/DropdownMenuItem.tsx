import {ComponentProps, FC, ReactNode} from 'react';
import './DropdownMenuItem.scss';
import {CustomButtonProps} from "../../buttons/MyPrimaryButton/MyPrimaryButton";

interface DropdownMenuItem  extends CustomButtonProps{
    children: ReactNode;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
}

const DropdownMenuItem: FC<DropdownMenuItem> = ({children, iconLeft, iconRight, ...props}) => {
    return (
        <>
            <button className='menu-item' type='button' {...props}>
                <span className='menu-item__icon-left'>{iconLeft}</span>
                {children}
                <span className='menu-item__icon-right'>{iconRight}</span>
            </button>

        </>

    );
};

export default DropdownMenuItem;
