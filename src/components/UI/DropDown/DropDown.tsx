import React from 'react';
import Loader from "../Loader/Loader";
import List from "../../Lists/List/List";
import {ListTypes} from "../../../models/ListTypes";
import './DropDown.scss'

interface DropDownProps<T> {
    isActive: boolean,
    error: any,
    isLoading: boolean,
    items: T[],
    renderItem: (item: T, index: number) => React.ReactNode
}

export default function DropDown<T>({isActive, renderItem, items, isLoading, error}: DropDownProps<T>) {
    return (
        <div className={isActive ? 'dropdown__result--active' : 'dropdown__result'}
        >
            {error && 'status' in error
                ? <span>{error.status}</span>
                : isLoading
                    ? <Loader/>
                    : items && items.length
                        ? <List type={ListTypes.SEARCH} items={items}
                                renderItem={renderItem}/>
                        : <span className='dropdown__result-nothing'>Nothing founded</span>
            }
        </div>
    );
};


