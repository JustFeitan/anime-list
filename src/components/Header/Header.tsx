import React, {FC, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Header.scss'
import {animeAPI} from "../../services/AnimeService";
import AnimeItem from "../AnimeItem/AnimeItem";
import {AppRoutes} from "../../routing/routes";
import {useAuth} from "../../hooks/useAuth";
import {useAppDispatch} from "../../hooks/redux";
import {authActions} from "../../store/reducers/auth";
import Avatar from "../UI/Avatar/Avatar";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import SearchWithDropDown from "../SearchWithDropDown/SearchWithDropDown";
import {IAnime} from "../../models/IAnime";
import DropdownMenu from "../UI/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "../UI/DropdownMenu/DropdownMenuItem/DropdownMenuItem";
import {ListIcon, LogoutIcon, ProfileIcon} from "../UI/Icons";
import {CSSTransition} from "react-transition-group";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandler";
import ProfileAvatarMenu from "../ProfileAvatarMenu/ProfileAvatarMenu";


const Header: FC = () => {

    const [searchInput, setSearchInput] = useState<string>('');


    const {data: animes, isLoading, error} = animeAPI.useFetchAnimeBySearchQuery(searchInput);


    const onSearch = (searchInput: string) => {
        setSearchInput(searchInput)
    }


    return (
        <header className='header'>
            <div className="header__wrapper">
                {/*Create navBar component*/}
                <nav className='header__nav'>
                    <Link className='header__logo' to='/'>AniMangach</Link>
                    <Link className='header__link' to='/'>Home</Link>
                    <Link className='header__link' to='anime'>Anime</Link>
                    <Link className='header__link' to='manga'>Manga</Link>
                </nav>
                <div className='header__search'>
                    <SearchWithDropDown items={animes as IAnime[]}
                                        renderItem={(anime, index: number) => <AnimeItem anime={anime} key={anime.title + index}/>}
                                        isLoading={isLoading}
                                        error={error}
                                        onSearch={searchInput => onSearch(searchInput)}
                    />
                </div>

                <ProfileAvatarMenu/>
            </div>
        </header>
    );
};

export default Header;
