import React, {ComponentProps, FC} from 'react';
import avatar from './../../../assets/hot.png'
import './Avatar.scss'

interface AvatarProps extends ComponentProps<'img'> {
    avatarImage?: string | undefined;
    size?: number;
}

const Avatar: FC<AvatarProps> = ({avatarImage = avatar, size= 35, ...props}) => {
    const styles = {
        width: size + 'px',
        height: size + 'px',
    }
    return (
        <img className='user-avatar__logo' src={avatarImage} alt="" style={styles} {...props}/>
    );
};

export default Avatar;
