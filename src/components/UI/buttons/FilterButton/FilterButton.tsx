import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC, useState} from 'react';
import styles from './FilterButtom.module.scss';
import {useAction, useAppSelector} from "../../../../hooks/redux";
import {FilterTypes} from "../../../../models/FilterTypes";
import {AnimeSeasonTypes} from "../../../../models/AnimeTypes";

interface FilterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    filterTitle: number | string;
    filterType: FilterTypes;
    reset:boolean;
}

const FilterButton: FC<FilterButtonProps> =
    ({
         filterTitle,
         filterType,
        reset,
         ...props
     }) => {

        const {filters} = useAppSelector(state => state.FilterReducer)
        const {addYear, removeYear, removeSeason, addSeason} = useAction();
        const [active, setActive] = useState<boolean>(false);

        let rootStyles = [styles.filterButton];
        if (active) {
            rootStyles.push(styles.active);
        }

        if (reset && active) {
            setActive(false);
        }


        const activeHandler = () => {
            setActive(prevState => !prevState);
            switch (filterType) {
                case FilterTypes.YEAR:
                    if (filters.year.includes(filterTitle as number)) {
                        removeYear(filterTitle as number);
                        setActive(false);
                    } else {
                        addYear(filterTitle as number);
                        setActive(true);
                    }
                    break;
                case FilterTypes.SEASON:
                    const season = (filterTitle as string).toUpperCase() as AnimeSeasonTypes;
                    if (filters.season.includes(season)) {
                        removeSeason(season);
                        setActive(false);
                    } else {
                        addSeason(season);
                        setActive(true);
                    }
                    break;
            }

        }

        return (
            <button {...props}
                    className={rootStyles.join(' ')}
                    onClick={activeHandler}
            >
                {filterTitle}
            </button>
        );
    };

export default FilterButton;
