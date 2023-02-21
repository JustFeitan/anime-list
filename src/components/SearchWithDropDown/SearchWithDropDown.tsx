import Input from "../UI/inputs/Input/Input";
import { DropDown } from "../UI/DropDown/DropDown";
import Loader from "../UI/Loader/Loader";
import List from "../UI/Lists/List/List";
import { ListTypes } from "../../models/ListTypes";
import React, { ChangeEvent, useMemo, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchWithDropDown.scss";

interface SearchWithDropDownProps<T> {
    onSearch: (searchInput: string) => void;
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

export default function SearchWithDropDown<T>({
    items,
    renderItem,
    isLoading,
    error,
    onSearch,
}: SearchWithDropDownProps<T>) {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const debouncedSearchInput = useDebounce(searchInput, 300);

    useMemo(() => {
        onSearch(searchInput);
    }, [debouncedSearchInput]);

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setSearchInput("");
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    const onFocusHandler = () => {
        setIsFocused(true);
    };

    const onChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <div className="search" onClick={() => onSearch(searchInput)}>
            <Input
                className="search__input"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={onChangedHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
            />

            <DropDown className="search__wrapper" isActive={isFocused}>
                {error && "status" in error ? (
                    <span>{error.status}</span>
                ) : isLoading ? (
                    <Loader />
                ) : items && items.length ? (
                    <List
                        type={ListTypes.SEARCH}
                        items={items}
                        renderItem={renderItem}
                    />
                ) : (
                    <span className="search__result-nothing">
                        Nothing founded
                    </span>
                )}
            </DropDown>
            <div className={isFocused ? "fainted-bg" : ""}></div>
        </div>
    );
}
