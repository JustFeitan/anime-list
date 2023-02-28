import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { animeAPI } from "../../services/AnimeService";

import { IAnime } from "../../models/IAnime";
import AnimeItem from "../AnimeItem/AnimeItem";
import ProfileAvatarMenu from "../ProfileAvatarMenu/ProfileAvatarMenu";
import SearchWithDropDown from "../SearchWithDropDown/SearchWithDropDown";
import { DropDown } from "../UI/DropDown/DropDown";
import SearchIcon from "../UI/Icons/SearchIcon";
import "./Header.scss";

const Header: FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    // For mobile logic
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 655);
    const [searchVisible, setSearchVisible] = useState<boolean>(false);

    const {
        data: animes,
        isLoading,
        error,
    } = animeAPI.useFetchAnimeBySearchQuery(searchInput);

    useEffect(() => {
        const handleWindowResize = () => {
            setIsMobile(window.innerWidth < 655);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const onSearch = (searchInput: string) => {
        setSearchInput(searchInput);
    };

    const onSearchIconClick = () => {
        setSearchVisible((prevState) => !prevState);
    };

    return (
        <header className="header">
            <div className="header__wrapper">
                {/*Create navBar component*/}
                <nav className="header__nav">
                    <Link className="header__logo" to="/">
                        AniMangach
                    </Link>
                    <Link className="header__link" to="anime">
                        Anime
                    </Link>
                    <Link className="header__link" to="manga">
                        Manga
                    </Link>
                </nav>
                {/*Header search*/}
                {isMobile ? (
                    <>
                        <DropDown
                            isActive={searchVisible}
                            className="header__search-mobile--active"
                        >
                            <SearchWithDropDown
                                items={animes as IAnime[]}
                                renderItem={(anime, index: number) => (
                                    <AnimeItem
                                        anime={anime}
                                        key={anime.title + index}
                                    />
                                )}
                                isLoading={isLoading}
                                error={error}
                                onSearch={(searchInput) =>
                                    onSearch(searchInput)
                                }
                            />
                        </DropDown>
                        <div
                            onClick={onSearchIconClick}
                            className={
                                searchVisible
                                    ? "header__search-mobile__fainted-bg"
                                    : ""
                            }
                        ></div>
                    </>
                ) : (
                    <div className={`header__search`}>
                        <SearchWithDropDown
                            items={animes as IAnime[]}
                            renderItem={(anime, index: number) => (
                                <AnimeItem
                                    anime={anime}
                                    key={anime.title + index}
                                />
                            )}
                            isLoading={isLoading}
                            error={error}
                            onSearch={(searchInput) => onSearch(searchInput)}
                        />
                    </div>
                )}

                <div className="header__right">
                    <SearchIcon
                        onClick={onSearchIconClick}
                        className="header__right__search-icon"
                        size={25}
                    />
                    {/*Profile menu*/}
                    <ProfileAvatarMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
