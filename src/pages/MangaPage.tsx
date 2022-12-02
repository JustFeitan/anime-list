import React, {ChangeEvent, useState} from 'react';
import {useCookies} from "react-cookie";

const MangaPage = () => {

    const yearFilters = [
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
    ];
    const seasonFilters = [
        'Spring',
        'Summer',
        'Winter',
        'Fall',
    ];
    const [value, setValue] = useState('');
    const [cookies, setCookie] = useCookies(['name']);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        setCookie('name', e.target.value, { path: '/' });
    }

    return (
        <div>
            <input value={value} onChange={onChange} />
            {cookies.name && <h1>Hello {cookies.name}!</h1>}
        </div>
    );
};

export default MangaPage;
