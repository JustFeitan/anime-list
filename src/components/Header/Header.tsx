import React, {FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './Header.scss'
import {animeAPI} from "../../services/AnimeService";
import Loader from "../UI/Loader/Loader";
import List from "../List/List";
import {ListTypes} from "../../models/ListTypes";
import {IAnime} from "../../models/IAnime";
import AnimeItem from "../AnimeItem/AnimeItem";
import {useDebounce} from "../../hooks/useDebounce";

const Header: FC = () => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const {data: animes, isLoading, error, refetch} = animeAPI.useFetchAnimeBySearchQuery(searchInput);

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setSearchInput('');
        setTimeout(() => {
            setIsFocused(false);
        }, 200)
    }
    // const debouncedRefetch = useDebounce(refetch, 1500);
    // useEffect(() => {
    //     debouncedRefetch();
    // }, [searchInput])

    const onFocusHandler = () => {
        setIsFocused(true);
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
                    <input className='header__input' type="text" placeholder='Search...'
                           value={searchInput}
                           onChange={event => setSearchInput(event.target.value)}
                           onFocus={onFocusHandler}
                    />
                    <div className={isFocused ? 'header__result--active' : 'header__result'}
                    >

                        {error && 'status' in error
                            ? <span>{error.status}</span>
                            : isLoading
                                ? <Loader/>
                                : animes && animes.length
                                    ? <List type={ListTypes.ANIME} items={animes as IAnime[]}
                                            renderItem={(anime: IAnime, index) => <AnimeItem anime={anime}
                                                                                      key={index}/>}/>
                                    : <span>Nothing founded</span>
                        }
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
