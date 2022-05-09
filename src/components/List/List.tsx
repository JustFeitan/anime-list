import React, {ReactNode} from 'react'
import {ListTypes} from "../../models/ListTypes";
import styles from './List.module.scss'

interface ListProps<T> {
    type: ListTypes
    items: T[] ;
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {

    const rootStiles = [styles.all];

    switch (props.type) {
        case ListTypes.ANIME: rootStiles.push(styles.anime)
    }

    return (
        <div className={rootStiles.join(' ')}>
            {props.items.map(props.renderItem)}
        </div>
    );
};


