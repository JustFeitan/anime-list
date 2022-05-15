import React, {FC, useEffect, useState} from 'react';
import List from "../List/List";
import {ListTypes} from "../../models/ListTypes";
import FilterButton from "../UI/buttons/FilterButton/FilterButton";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import Modal from "../UI/Modal/Modal";
import {IAnimeFilter} from "../../models/IAnimeFilter";
import {useAction, useAppSelector} from "../../hooks/redux";
import {FilterTypes} from "../../models/FilterTypes";
import './AnimeFilter.scss';

interface AnimeFilterProps {
    filterList: any[];
    filterName: string;
    setFilters: ({}: IAnimeFilter) => void;
    filterType: FilterTypes;
}

const AnimeFilter: FC<AnimeFilterProps> = ({filterList, setFilters, filterName, filterType}) => {

    const [modal, setModal] = useState<boolean>(false);
    const {filters} = useAppSelector(state => state.FilterReducer);
    const [reset, setRest] = useState(false)
    const {resetSeason, resetYear} = useAction();

    const acceptHandler = () => {
        setFilters(filters);
        setModal(false);
    }

    useEffect(() => {
        if (!reset) return;
        switch (filterType) {
            case FilterTypes.YEAR:
                resetYear();
                break;
            case FilterTypes.SEASON:
                resetSeason();
                break;
        }
        setRest(false);
    }, [reset])

    useEffect(() => {
        setFilters(filters);
    }, [reset])

    const resetHandler = () => {
        setRest(true);
    }

    return (
        <div>
            <div className='filter__btn'>
                <MyPrimaryButton onClick={() => setModal(true)}>
                    {filterName}
                </MyPrimaryButton>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <List type={ListTypes.FILTER}
                      items={filterList}
                      renderItem={(filter) =>
                          <FilterButton
                              reset={reset}
                              filterTitle={filter}
                              filterType={filterType}
                              title={filter}
                          />}
                />
                <div className='filter__nav'>
                    <MyPrimaryButton
                        onClick={resetHandler}
                        width={'70px'}
                    >
                        Reset
                    </MyPrimaryButton>

                    <MyPrimaryButton
                        onClick={acceptHandler}
                        width={'70px'}
                    >
                        Accept
                    </MyPrimaryButton>
                </div>
            </Modal>
        </div>
    );
};

export default AnimeFilter;
