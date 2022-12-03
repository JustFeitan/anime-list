import React, {FC} from 'react';
import {IconInterface} from "../../../models/Icon";
import Icon from "./Icon/Icon";


const ProfileIcon: FC<IconInterface> = ({size}) => {
    return (
        <Icon icon={
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000"
                 xmlSpace="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490s490-219.4,490-490C990,229.4,770.6,10,500,10z M494.4,220.6c82.3,0,149.4,66.1,149.4,147.2c0,81.1-67,147.2-149.4,147.2c-82.3,0-149.4-66.1-149.4-147.2C345.1,286.7,412.1,220.6,494.4,220.6z M744.5,753c0,53.5-87.4,53.5-188.6,53.5H444c-105.4,0-188.6,0-188.6-53.5v-11c0-102.4,84.6-185.7,188.6-185.7H556c104,0,188.6,83.3,188.6,185.7L744.5,753L744.5,753z"/></g>
</svg>
        } size={size}/>
    );
};

export {ProfileIcon};
