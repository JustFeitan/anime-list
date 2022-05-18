import React, {AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC, useState} from 'react';
import styles from './FilterButtom.module.scss';

interface FilterButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes {
    filterTitle: number | string;
    filter: (filterTitle: number | string) => void;
    reset: boolean;
}

const FilterButton: FC<FilterButtonProps> =
    ({
         filterTitle,
         filter,
         reset,
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
            filter(filterTitle);
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
