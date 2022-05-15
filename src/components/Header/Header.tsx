import React from 'react';
import {Link} from "react-router-dom";
import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div className="header__wrapper">

                <nav className='header__nav'>
                    <Link className='header__logo' to='/'>AniMangach</Link>
                    <Link className='header__link' to='/'>Home</Link>
                    <Link className='header__link' to='/anime'>Anime</Link>
                    <Link className='header__link' to='/'>Manga</Link>
                </nav>
                <input type="text"/>
            </div>
        </header>
    );
};

export default Header;
