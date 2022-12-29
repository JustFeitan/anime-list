import {ComponentProps, FC} from "react";
import {IconInterface} from "../../../../models/Icon";
import './Icon.scss';

interface IconProps extends IconInterface, ComponentProps<'span'>{
    icon: JSX.Element;
}

const Icon: FC<IconProps> = ({icon, size= 20, ...props}) => {
    const styles = {
        width: size + 'px',
        height: size + 'px',
    }
    return (
        <span className='icon-btn' style={styles} {...props}>
            {icon}
        </span>
    );
};

export default Icon;
