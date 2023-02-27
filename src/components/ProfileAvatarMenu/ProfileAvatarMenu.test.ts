import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { IUser } from "../../models/User/IUser";
import { config } from "react-transition-group";
import { renderTestApp } from "../../utils/renderTestApp";
import userEvent from "@testing-library/user-event";
import { authActions, authReducer } from "../../store/reducers/auth";
import { getUser } from "../../store/reducers/auth/selectors/getUser";
import { authSlice } from "../../store/reducers/auth/AuthSlice";

describe("Profile menu tests", () => {
    let userMock: IUser;
    beforeAll(() => {
        config.disabled = true;
        userMock = {
            email: "gmd29999@yandex.ru",
            password:
                "$2a$10$3.yJQMw1NeU6a3rabhtoaubTXf4Xlbo5odgS/ss6AQWng0OCRrPzK",
            username: "Feitan4",
            id: "1",
            profileCover: "",
            userAvatar: "",
        };
    });
    test("popup works", async () => {
        const user = userEvent.setup();
        renderTestApp(null, {
            initialReduxState: {
                authReducer: {
                    user: userMock,
                },
            },
        });
        const profileAvatarMenu = screen.getByTestId("header-user-avatar");
        await user.click(profileAvatarMenu);
        expect(screen.getByTestId("header-profile-menu")).toBeTruthy();
    });
    test("navigation test", async () => {
        const user = userEvent.setup();
        renderTestApp(null, {
            initialReduxState: {
                authReducer: {
                    user: userMock,
                },
            },
        });
        const profileAvatarMenu = screen.getByTestId("header-user-avatar");
        await user.click(profileAvatarMenu);
        await user.click(screen.getByText(/My profile/i));
        expect(screen.getByTestId("profile-page")).toBeInTheDocument();
    });

    test("logout user btn", async () => {
        const user = userEvent.setup();
        renderTestApp(null, {
            initialReduxState: {
                authReducer: {
                    user: userMock,
                    accessToken: "asdasdasdasd12312",
                    isLoading: false,
                },
            },
        });
        const profileAvatarMenu = screen.getByTestId("header-user-avatar");
        await user.click(profileAvatarMenu);
        await user.click(screen.getByText(/Logout/i));
        expect(authReducer(undefined, authActions.logout)).toEqual({
            accessToken: null,
            user: null,
            isLoading: false,
        });
        screen.debug();
    });
});
