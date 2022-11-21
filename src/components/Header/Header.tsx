import React, {ChangeEvent, FC, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Header.scss'
import {animeAPI} from "../../services/AnimeService";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../AnimeItem/AnimeItem";
import {useDebounce} from "../../hooks/useDebounce";
import DropDown from "../UI/DropDown/DropDown";
import {useAppSelector} from "../../hooks/redux";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import {AppRoutes} from "../../routing/routes";
import SecondaryButton from "../UI/buttons/SecondaryButton/SecondaryButton";

const Header: FC = () => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {isAuth} = useAppSelector(state => state.authReducer);

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

    return (
        <header className='header'>
            <div className="header__wrapper">

                <nav className='header__nav'>
                    <Link className='header__logo' to='/'>AniMangach</Link>
                    <Link className='header__link' to='/'>Home</Link>
                    <Link className='header__link' to='anime'>Anime</Link>
                    <Link className='header__link' to='manga'>Manga</Link>
                </nav>
                {/*!!!!!!!!Добавить компонент!!!!!!!!!!!!*/}
                <div className='header__search' onBlur={onBlurHandler}>
                    <input className='header__input' type="text" placeholder='Search...'
                           value={searchInput}
                           onChange={onChangedHandler}
                           onFocus={onFocusHandler}
                    />
                    <DropDown isActive={isFocused} error={error} isLoading={isLoading} items={animes as IAnime[]}
                              renderItem={(anime: IAnime, index) => <AnimeItem anime={anime} key={index}/>}/>
                </div>
                <div className='header__profile'>
                    {
                        isAuth
                            ? <div className='header__profile__logo'>

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
