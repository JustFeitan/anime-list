import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import styles from './MyPrimareButton.module.scss'

export interface CustomButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    fullWidth?: boolean;
    width?: string;
    height?: string;
    fontSize?: string;
    isLoading?: boolean;
    variant?: 'fulfilled' | 'outlined';
}


const MyPrimaryButton: FC<CustomButtonProps> = ({
                                                    variant = 'fulfilled',
                                                    fullWidth,
                                                    width = '145px',
                                                    fontSize,
                                                    height = '35px',
                                                    children,
                                                    isLoading,
                                                    ...props
                                                }) => {
    const optionalStyles = {
        width: fullWidth ? '100%' : width,
        height: height,
        fontSize: fontSize,
    }

    return <button className={variant === 'fulfilled' ? styles.fulfilledBtn : styles.outlinedBtn}
                   type='submit'
                   style={optionalStyles}
                   {...props}
                   disabled={isLoading}
    >
        {isLoading ? children + '...' : children}
    </button>;
};

export default MyPrimaryButton;
