import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC, useState} from 'react';
import styles from './FilterButtom.module.scss';
import {FilterTypes} from "../../../../models/FilterTypes";

interface FilterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    filterTitle: number | string;
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
