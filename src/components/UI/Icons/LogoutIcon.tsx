import React, { FC } from "react";

import { IconInterface } from "../../../models/Icon";
import Icon from "./Icon/Icon";

const LogoutIcon: FC<IconInterface> = ({ size }) => {
    return (
        <Icon
            icon={
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1000 1000"
                    enableBackground="new 0 0 1000 1000"
                    xmlSpace="preserve"
                >
                    <metadata>
                        {" "}
                        Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                    </metadata>
                    <g>
                        <path d="M622.5,990H50.8C26.3,990,10,973.7,10,949.2V50.8C10,26.3,26.3,10,50.8,10h571.7c24.5,0,40.8,16.3,40.8,40.8v285.8c0,24.5-16.3,40.8-40.8,40.8s-40.8-16.3-40.8-40.8v-245h-490v816.7h490v-245c0-24.5,16.3-40.8,40.8-40.8s40.8,16.3,40.8,40.8v285.8C663.3,973.7,647,990,622.5,990z" />
                        <path d="M949.2,540.8H336.7c-24.5,0-40.8-16.3-40.8-40.8c0-24.5,16.3-40.8,40.8-40.8h612.5c24.5,0,40.8,16.3,40.8,40.8C990,524.5,973.7,540.8,949.2,540.8z" />
                        <path d="M949.2,540.8c-12.3,0-20.4-4.1-28.6-12.3L757.3,365.3c-16.3-16.3-16.3-40.8,0-57.2c16.3-16.3,40.8-16.3,57.2,0l163.3,163.3c16.3,16.3,16.3,40.8,0,57.2C969.6,536.8,961.4,540.8,949.2,540.8z" />
                        <path d="M785.8,704.2c-12.3,0-20.4-4.1-28.6-12.3c-16.3-16.3-16.3-40.8,0-57.2l163.3-163.3c16.3-16.3,40.8-16.3,57.2,0c16.3,16.3,16.3,40.8,0,57.2L814.4,691.9C806.3,700.1,798.1,704.2,785.8,704.2z" />
                    </g>
                </svg>
            }
            size={size}
        />
    );
};

export { LogoutIcon };
