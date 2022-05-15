import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import styles from './MyPrimareButton.module.scss'

interface MyPrimaryButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    width?: string;
    height?: string;
    fontSize?: string
}


const MyPrimaryButton: FC<MyPrimaryButtonProps> = ({width = '145px', fontSize , height = '30px', children, ...props}) => {

    return <button className={styles.primaryBtn}
                   style={{width: width, height: height, fontSize: fontSize}}
                   {...props}
    >
        {children}
    </button>;
};

export default MyPrimaryButton;
