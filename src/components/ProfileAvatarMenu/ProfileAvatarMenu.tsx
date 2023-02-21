import React, { useRef, useState } from "react";
import Avatar from "../UI/Avatar/Avatar";
import { CSSTransition } from "react-transition-group";
import DropdownMenu from "../UI/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "../UI/DropdownMenu/DropdownMenuItem/DropdownMenuItem";
import { ListIcon, LogoutIcon, ProfileIcon } from "../UI/Icons";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import { AppRoutes } from "../../routing/routes";
import { authActions } from "../../store/reducers/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { useAuth } from "../../hooks/useAuth";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler";
import "./ProfileAvatarMenu.scss";
import { useCookies } from "react-cookie";

const ProfileAvatarMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

    const dispatch = useAppDispatch();
    const user = useAuth();

    const dropdownMenu = useRef<HTMLDivElement | null>(null);
    useOutsideClickHandler(dropdownMenu, () => {
        setIsMenuOpen(false);
    });

    const LoginInHandler = () => {
        navigate(AppRoutes.LOGIN, { state: { from: location } });
        setIsMenuOpen(false);
    };

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("user");
        removeCookie("jwt-token");
        setIsMenuOpen(false);
    };

    const goToProfile = () => {
        navigate(AppRoutes.HOME + user?.username, {
            state: { userId: user?.id },
        });
        setIsMenuOpen(false);
    };

    return (
        <div ref={dropdownMenu} className="profile-menu">
            {user ? (
                <>
                    <Avatar
                        avatarImage={user.userAvatar as string}
                        onClick={() => setIsMenuOpen((prevState) => !prevState)}
                    />

                    <CSSTransition
                        in={isMenuOpen}
                        unmountOnExit
                        timeout={500}
                        classNames="menu-primary"
                    >
                        <DropdownMenu>
                            <DropdownMenuItem
                                onClick={goToProfile}
                                iconLeft={<ProfileIcon />}
                            >
                                My Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem iconLeft={<ListIcon />}>
                                My Animes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={logoutHandler}
                                iconLeft={<LogoutIcon />}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenu>
                    </CSSTransition>
                </>
            ) : (
                <MyPrimaryButton
                    height={30}
                    width={100}
                    variant="outlined"
                    onClick={LoginInHandler}
                >
                    Log in
                </MyPrimaryButton>
            )}
        </div>
    );
};

export default ProfileAvatarMenu;
