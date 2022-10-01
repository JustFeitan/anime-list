import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC, useEffect, useState} from 'react';
import styles from './FilterButtom.module.scss';
import {FilterTypes} from "../../../../models/FilterTypes";
import {useSearchParams} from "react-router-dom";

interface FilterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    filterTitle: string;
    filter: (filterTitle: string | number, filterType: FilterTypes) => void;
    reset: boolean;
    filterType: FilterTypes;
}

const FilterButton: FC<FilterButtonProps> =
    ({
         filterTitle,
         filter,
         reset,
         filterType,
         ...props
     }) => {

        const [active, setActive] = useState<boolean>(false);
        const [searchParams, setSearchParams] = useSearchParams();
        const params = searchParams.getAll(filterType);

        useEffect(() => {
            if (params.includes(filterTitle)) {
                setActive(true);
            }
        }, params)


        let rootStyles = [styles.filterButton];
        if (active) {
            rootStyles.push(styles.active);
        }

        if (reset && active) {
            setActive(false);
        }

        const activeHandler = () => {
            setActive(prevState => !prevState);
            filter(filterTitle, filterType);
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
