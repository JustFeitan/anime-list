import { ComponentProps, FC } from "react";

import BackgroundImage from "./../../../assets/login-background.jpg";
import "./FullScreenImageContainer.scss";

interface FullScreenImageContainerProps extends ComponentProps<"div"> {
    backgroundImg: string;
}

const FullScreenImageContainer: FC<FullScreenImageContainerProps> = ({
    backgroundImg,
    children,
    ...props
}) => {
    backgroundImg = BackgroundImage;
    const styles = {
        backgroundImage: backgroundImg && `url(${backgroundImg})`,
    };
    return (
        <div className="fullscreen-image-bg" style={styles} {...props}>
            {children}
        </div>
    );
};

export default FullScreenImageContainer;
