import React, { ComponentProps, FC } from "react";
import Icon from "./Icon/Icon";
import { IconInterface } from "../../../models/Icon";

interface CertainIconProps extends IconInterface, ComponentProps<"span"> {}

const SearchIcon: FC<CertainIconProps> = ({ size, ...props }) => {
    return (
        <Icon
            icon={
                <svg
                    viewBox="0 0 83 85"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="32.5"
                        cy="32.5"
                        r="25.5"
                        stroke="#00D1FF"
                        strokeWidth="14"
                    />
                    <path
                        d="M55.3033 46.6967L50 41.3934L39.3934 52L44.6967 57.3033L55.3033 46.6967ZM69.6967 82.3033C72.6256 85.2322 77.3744 85.2322 80.3033 82.3033C83.2322 79.3744 83.2322 74.6256 80.3033 71.6967L69.6967 82.3033ZM44.6967 57.3033L69.6967 82.3033L80.3033 71.6967L55.3033 46.6967L44.6967 57.3033Z"
                        fill="#00D1FF"
                    />
                </svg>
            }
            size={size}
            {...props}
        ></Icon>
    );
};

export default SearchIcon;
