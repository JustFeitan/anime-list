import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import classes from './SecondaryButton.module.scss'

interface MySecondaryButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    width?: string;
    height?: string;
    fontSize?: string
}

const SecondaryButton: FC<MySecondaryButtonProps> = ({
                                                         width = '100px',
                                                         height = '30px',
                                                         fontSize,
                                                         children,
                                                         ...props
                                                     }) => {
    return (
        <button className={classes.secondaryBtn} style={{width, height, fontSize}} {...props}>
            {children}
        </button>
    );
};

export default SecondaryButton;
