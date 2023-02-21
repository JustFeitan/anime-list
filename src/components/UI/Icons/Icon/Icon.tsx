import { ComponentProps, FC } from "react";
import { IconInterface } from "../../../../models/Icon";
import "./Icon.scss";

interface IconProps extends IconInterface, ComponentProps<"span"> {
    icon: JSX.Element;
}

const Icon: FC<IconProps> = ({ icon, size = 20, className, ...props }) => {
    const styles = {
        width: size + "px",
        height: size + "px",
    };
    return (
        <span
            className={className ? `icon-btn ${className}` : `icon-btn`}
            style={styles}
            {...props}
        >
            {icon}
        </span>
    );
};

export default Icon;
