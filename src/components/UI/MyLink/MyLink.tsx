import React, {FC} from 'react';
import {Link} from "react-router-dom";

interface MyLinkProps {
    to: string;
}

const MyLink: FC<MyLinkProps> = ({}) => {
    return (
        <Link to='/'>

        </Link>
    );
};

export default MyLink;
