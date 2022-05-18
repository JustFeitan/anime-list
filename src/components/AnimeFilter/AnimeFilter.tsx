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
import {AnimeSeasonTypes} from "../../models/AnimeTypes";
import {useFilterWindow} from "../../hooks/useFilterWindow";

interface AnimeFilterProps {
    filterList: any[];
    filterName: string;
    setFilters: ({}: IAnimeFilter) => void;
    filterType: FilterTypes;
}

const AnimeFilter: FC<AnimeFilterProps> = ({filterList, setFilters, filterName, filterType}) => {

    const [modal, setModal] = useState<boolean>(false);

    const {filters, filter, reset, setIsReset, isReset} = useFilterWindow(filterType);


    useEffect(() => {
        reset();
        setFilters(filters);
    }, [isReset])


    const isResetHandler = () => {
        setIsReset(true);
    }

    const acceptHandler = () => {
        setFilters(filters);
        setModal(false);
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
                      renderItem={(filterTitle) =>
                          <FilterButton
                              reset={isReset}
                              filter={filter}
                              filterTitle={filterTitle}
                          />}
                />

                <div className='filter__nav'>
                    <MyPrimaryButton
                        onClick={isResetHandler}
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
