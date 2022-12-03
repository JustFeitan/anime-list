import {FC} from 'react';
import {useParams} from "react-router-dom";

const ProfilePage: FC = () => {

    const {username} = useParams()
    console.log(username)
    return (
        <div>
            {username}
        </div>
    );
};

export default ProfilePage;
