import {ListTypes} from "../../../models/ListTypes";
import styles from './List.module.scss'

interface ListProps<T> {
    type: ListTypes;
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
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
        case ListTypes.SEARCH:
            rootStiles.push(styles.search);
            break;
    }
    return (
            <div className={rootStiles.join(' ')}>
                {props.items.map(props.renderItem)}
            </div>

    );
};




