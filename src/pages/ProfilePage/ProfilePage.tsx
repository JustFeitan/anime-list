import { FC, Suspense, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Avatar from "../../components/UI/Avatar/Avatar";
import Typography from "../../components/UI/Typography/Typography";
import { authApi } from "../../services/AuthService";
import Loader from "../../components/UI/Loader/Loader";
import MyPrimaryButton from "../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";
import "./ProfilePage.scss";
import Navbar from "../../components/UI/Navbar/Navbar";
import NavbarItem from "../../components/UI/Navbar/NavbarItem/NavbarItem";
import { AppRoutes } from "../../routing/routes";
import Modal from "../../components/UI/Modal/Modal";
import EditProfile from "../../components/EditProfileModal/EditProfileModal";

const ProfilePage: FC = () => {
    const { username } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;
    const {
        data: user,
        error: userError,
        isLoading,
    } = authApi.useGetUserQuery(userId);
    console.log(userId);

    const [visible, setVisible] = useState<boolean>(false);

    const editProfileModalHandler = () => {
        setVisible(true);
    };

    const onSubmitProfileChanges = () => {
        setVisible(false);
    };

    return (
        <div className="profile">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="profile__header">
                        {/*User's cover image*/}

                        <div className="profile__header__cover">
                            <img
                                src={user!.profileCover as string}
                                alt=""
                                className="profile__header__cover__img"
                            />
                            <div className="profile__header__main">
                                <div className="profile__header__main__data">
                                    {/*User's Avatar*/}
                                    <div className="profile__header__main__data__avatar">
                                        <Avatar
                                            size={165}
                                            avatarImage={
                                                user!.userAvatar as string
                                            }
                                        />
                                    </div>
                                    {/*User's username and email*/}
                                    <div className="profile__header__main__data__info">
                                        <Typography
                                            component="span"
                                            className="profile__header__main__data__info__username"
                                        >
                                            {user?.username}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            className="profile__header__main__data__info__email"
                                        >
                                            {user?.email}
                                        </Typography>
                                    </div>
                                </div>
                                {/*User's edit buttons*/}
                                <div className="profile__header__main__btns">
                                    <MyPrimaryButton
                                        onClick={editProfileModalHandler}
                                    >
                                        Edit Profile
                                    </MyPrimaryButton>
                                </div>
                                <Modal
                                    visible={visible}
                                    setVisible={setVisible}
                                >
                                    <EditProfile
                                        user={user!}
                                        onSubmitHandler={onSubmitProfileChanges}
                                    />
                                </Modal>
                            </div>
                        </div>

                        <div className="profile__header__nav">
                            <Navbar>
                                <NavbarItem
                                    className="profile__header__nav__link"
                                    to={`/${username}`}
                                    state={{ userId: userId }}
                                    end
                                >
                                    Completed
                                </NavbarItem>
                                <NavbarItem
                                    className="profile__header__nav__link"
                                    to={AppRoutes.WATCHING_ANIME_LIST}
                                    state={{ userId: userId }}
                                >
                                    Currently watching
                                </NavbarItem>
                                <NavbarItem
                                    className="profile__header__nav__link"
                                    to={AppRoutes.PLAN_ANIME_LIST}
                                    state={{ userId: userId }}
                                >
                                    Plan to watch
                                </NavbarItem>
                            </Navbar>
                        </div>
                    </div>

                    <div className="profile__content">
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
