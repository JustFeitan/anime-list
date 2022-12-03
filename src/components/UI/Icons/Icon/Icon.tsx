import {ComponentProps, FC} from "react";
import {IconInterface} from "../../../../models/Icon";

interface IconProps extends IconInterface, ComponentProps<'span'>{
    icon: JSX.Element;
}

const Icon: FC<IconProps> = ({icon, size= 20, ...props}) => {
    const styles = {
        width: size + 'px',
        height: size + 'px',
    }
    return (
        <span className='icon' style={styles} {...props}>
            {icon}
        </span>
    );
};

export default Icon;
