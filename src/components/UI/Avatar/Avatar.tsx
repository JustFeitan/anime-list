import React, {ComponentProps, FC} from 'react';
import avatar from './../../../assets/hot.png'
import './Avatar.scss'

interface AvatarProps extends ComponentProps<'img'>{
    avatarImage?: string;
}

const Avatar: FC<AvatarProps> = ({avatarImage= avatar, ...props}) => {
    return (
            <img className='user-avatar__logo' src={avatarImage} alt="" {...props}/>
    );
};

export default Avatar;
