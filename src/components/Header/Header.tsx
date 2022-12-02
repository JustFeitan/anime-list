import React, {ChangeEvent, FC, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Header.scss'
import {animeAPI} from "../../services/AnimeService";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../AnimeItem/AnimeItem";
import {useDebounce} from "../../hooks/useDebounce";
import DropDown from "../UI/DropDown/DropDown";
import {AppRoutes} from "../../routing/routes";
import SecondaryButton from "../UI/buttons/SecondaryButton/SecondaryButton";
import {useAuth} from "../../hooks/useAuth";
import Input from "../UI/inputs/Input/Input";
import {useAppDispatch} from "../../hooks/redux";
import {authActions} from "../../store/reducers/auth";

const Header: FC = () => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const user = useAuth();

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setSearchInput('');
        setTimeout(() => {
            setIsFocused(false);
        }, 200)
    }

    const debouncedSearchInput = useDebounce(searchInput, 500);
    const {data: animes, isLoading, error} = animeAPI.useFetchAnimeBySearchQuery(debouncedSearchInput);

    const onFocusHandler = () => {
        setIsFocused(true);
    }

    const onChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }

    const LoginInHandler = () => {
        navigate(AppRoutes.LOGIN, {state: {from: location}})
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return (
        <header className='header'>
            <div className="header__wrapper">

                <nav className='header__nav'>
                    <Link className='header__logo' to='/'>AniMangach</Link>
                    <Link className='header__link' to='/'>Home</Link>
                    <Link className='header__link' to='anime'>Anime</Link>
                    <Link className='header__link' to='manga'>Manga</Link>
                </nav>
                <div className='header__search' onBlur={onBlurHandler}>
                    <Input
                        className='header__search__input'
                        type="text"
                        placeholder='Search...'
                        value={searchInput}
                        onChange={onChangedHandler}
                        onFocus={onFocusHandler}
                    />
                    <DropDown isActive={isFocused} error={error} isLoading={isLoading}
                              items={animes as IAnime[]}
                              renderItem={(anime: IAnime, index) => <AnimeItem anime={anime} key={index}/>}/>
                </div>

                <div className='header__profile'>
                    {
                        user
                            ? <div onClick={logoutHandler} className='header__profile__logo'>

                            </div>
                            : <SecondaryButton onClick={LoginInHandler}>
                                Log in
                            </SecondaryButton>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
