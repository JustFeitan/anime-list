import React, {useRef, useState} from 'react';
import Avatar from "../UI/Avatar/Avatar";
import {CSSTransition} from "react-transition-group";
import DropdownMenu from "../UI/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "../UI/DropdownMenu/DropdownMenuItem/DropdownMenuItem";
import {ListIcon, LogoutIcon, ProfileIcon} from "../UI/Icons";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import {AppRoutes} from "../../routing/routes";
import {authActions} from "../../store/reducers/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {useAuth} from "../../hooks/useAuth";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler";
import './ProfileAvatarMenu.scss';

const ProfileAvatarMenu = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const user = useAuth();

    const dropdownMenu = useRef<HTMLDivElement | null>(null);
    useOutsideClickHandler(dropdownMenu, () => {
        setIsMenuOpen(false)
    })

    const LoginInHandler = () => {
        navigate(AppRoutes.LOGIN, {state: {from: location}})
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const goToProfile = () => {
        navigate(AppRoutes.HOME + user?.username + user?.id)
    }

    return (
        <div className='profile-menu'>
            {
                user
                    ? <>
                        <Avatar onClick={() => setIsMenuOpen(prevState => !prevState)}/>

                        <CSSTransition
                            in={isMenuOpen}
                            unmountOnExit
                            timeout={500}
                            classNames='menu-primary'
                        >
                            <DropdownMenu ref={dropdownMenu}>
                                <DropdownMenuItem
                                    onClick={goToProfile}
                                    iconLeft={<ProfileIcon/>}
                                >
                                    My Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    iconLeft={<ListIcon/>}
                                >
                                    My Animes
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={logoutHandler}
                                    iconLeft={<LogoutIcon/>}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </CSSTransition>
                    </>

                    : <MyPrimaryButton
                        height='30px'
                        width='100px'
                        variant='outlined'
                        onClick={LoginInHandler}
                    >
                        Log in
                    </MyPrimaryButton>
            }
        </div>
    );
};

export default ProfileAvatarMenu;
