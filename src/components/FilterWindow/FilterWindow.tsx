import React, { FC, useEffect, useState } from "react";

import { FilterTypes } from "../../models/FilterTypes";
import { ListTypes } from "../../models/ListTypes";
import List from "../UI/Lists/List/List";
import Modal from "../UI/Modal/Modal";
import FilterButton from "../UI/buttons/FilterButton/FilterButton";
import MyPrimaryButton from "../UI/buttons/MyPrimaryButton/MyPrimaryButton";
import "./FilterWindow.scss";

interface AnimeFilterProps {
    filterList: any[];
    filterName: string;
    filterType: FilterTypes;
    acceptHandler: () => void;
    resetHandler: (filterType: FilterTypes) => void;
    filter: (filterTitle: any, filterType: FilterTypes) => void;
}

const FilterWindow: FC<AnimeFilterProps> = ({
    filterList,
    filterName,
    filterType,
    resetHandler,
    acceptHandler,
    filter,
}) => {
    const [modal, setModal] = useState<boolean>(false);
    const [isReset, setIsReset] = useState<boolean>(false);

    useEffect(() => {
        resetHandler(filterType);
        setIsReset(false);
    }, [isReset]);

    const reset = () => {
        setIsReset(true);
    };

    const accept = () => {
        acceptHandler();
        setModal(false);
    };

    return (
        <div>
            <div className="filter__btn">
                <MyPrimaryButton onClick={() => setModal(true)}>
                    {filterName}
                </MyPrimaryButton>
            </div>

            <Modal visible={modal} setVisible={setModal}>
                <List
                    type={ListTypes.FILTER}
                    items={filterList}
                    renderItem={(filterTitle, index) => (
                        <FilterButton
                            key={index}
                            reset={isReset}
                            filter={filter}
                            filterTitle={filterTitle}
                            filterType={filterType}
                        />
                    )}
                />

                <div className="filter__nav">
                    <MyPrimaryButton onClick={reset} width={70}>
                        Reset
                    </MyPrimaryButton>

                    <MyPrimaryButton onClick={accept} width={70}>
                        Accept
                    </MyPrimaryButton>
                </div>
            </Modal>
        </div>
    );
};

export default FilterWindow;
