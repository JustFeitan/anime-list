import React, { ComponentProps, FC } from "react";
import avatar from "./../../../assets/hot.png";
import "./Avatar.scss";

interface AvatarProps extends ComponentProps<"img"> {
    avatarImage?: string;
    size?: number;
}

const Avatar: FC<AvatarProps> = ({ avatarImage, size = 35, ...props }) => {
    const styles = {
        width: size + "px",
        height: size + "px",
    };

    return (
        <img
            className="user-avatar__logo"
            src={avatarImage || avatar}
            alt=""
            style={styles}
            {...props}
        />
    );
};

export default Avatar;
