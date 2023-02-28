/**@jest-environment jsdom
 *
 */
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import AppRouter from "../routing/AppRouter";
import { AppStore, setStore } from "../store/store";

interface renderTestAppOptions {
    route?: string;
    initialReduxState?: any;
}

export const renderTestApp = (
    component?: JSX.Element | JSX.Element[] | ReactNode | null,
    params?: renderTestAppOptions
) => {
    const store = setStore(params?.initialReduxState);
    return render(
        <MemoryRouter initialEntries={[params?.route || "/"]}>
            <Provider store={store}>
                <AppRouter />
                {component}
            </Provider>
        </MemoryRouter>
    );
};
