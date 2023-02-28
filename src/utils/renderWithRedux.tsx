import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { setStore } from "../store/store";

export const RenderWithRedux = (
    component: JSX.Element | JSX.Element[] | ReactNode
) => {
    const store = setStore();
    return render(<Provider store={store}>{component}</Provider>);
};
