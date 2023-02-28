import { ComponentProps, FC } from "react";

import { IAnime } from "../../../models/IAnime";
import "./AnimeCover.scss";

interface AnimeCoverProps extends ComponentProps<"div"> {
    anime: IAnime;
    minHeight: number;
    minWidth?: number;
}

const AnimeCover: FC<AnimeCoverProps> = ({
    anime,
    children,
    minHeight,
    minWidth,
    className,
    ...props
}) => {
    const ImgStyles = {
        backgroundImage: `url(${anime.picture})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: minHeight,
        minWidth: minWidth,
    };

    return (
        <div
            style={ImgStyles}
            className={
                className ? `anime-item__img ${className}` : `anime-item__img`
            }
            {...props}
        >
            {children}
        </div>
    );
};

export default AnimeCover;
