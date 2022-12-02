import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import './IconButton.scss'

interface IconButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {

}

const IconButton: FC<IconButtonProps> = ({children, ...props}) => {

    return <button className='icon-btn'
                   type='button'
                   {...props}
    >
        {children}
    </button>;
};

export default IconButton;
