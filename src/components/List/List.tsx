import React from 'react'
import {ListTypes} from "../../models/ListTypes";
import styles from './List.module.scss'
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import {useAppSelector} from "../../hooks/redux";

interface ListProps<T> {
    type: ListTypes
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {

    const rootStiles = [styles.all];
    switch (props.type) {
        case ListTypes.ANIME:
            rootStiles.push(styles.anime);
            break;
        case ListTypes.FILTER:
            rootStiles.push(styles.filter);
            break;
    }

    return (
            <div className={rootStiles.join(' ')}>
                {props.items.map(props.renderItem)}
            </div>

    );
};


