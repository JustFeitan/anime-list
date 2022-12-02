import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import styles from './MyPrimareButton.module.scss'

interface MyPrimaryButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    fullWidth?: boolean;
    width?: string;
    height?: string;
    fontSize?: string;
    isLoading?: boolean
}


const MyPrimaryButton: FC<MyPrimaryButtonProps> = ({
                                                       fullWidth,
                                                       width = '145px',
                                                       fontSize,
                                                       height = '30px',
                                                       children,
                                                       isLoading,
                                                       ...props
                                                   }) => {
    const optionalStyles = {
        width: fullWidth ? '100%' : width,
        height: height,
        fontSize: fontSize,
    }

    return <button className={styles.primaryBtn}
                   type='submit'
                   style={optionalStyles}
                   {...props}
                   disabled={isLoading}
    >
        {isLoading ? children + '...' : children}
    </button>;
};

export default MyPrimaryButton;
