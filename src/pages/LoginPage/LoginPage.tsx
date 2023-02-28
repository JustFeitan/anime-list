import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

import Form from "../../components/UI/Form/Form";
import FormWrapper from "../../components/UI/FormWrapper/FormWrapper";
import FullScreenImageContainer from "../../components/UI/FullScreenImageContainer/FullScreenImageContainer";
import Typography from "../../components/UI/Typography/Typography";
import MyPrimaryButton from "../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";
import Input from "../../components/UI/inputs/Input/Input";
import PasswordInput from "../../components/UI/inputs/PasswordInput/PasswordInput";

import { useLogin } from "../../hooks/useLogin";
import { ILoginRequest } from "../../models/User/ILoginRequest";
import LoginBackgroundImage from "./../../assets/login-background.jpg";
import "./LoginPage.scss";

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email required").email("Wrong email format"),
    password: yup
        .string()
        .required("Password required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "At least 8 symbols, one uppercase letter, one lowercase letter and one number"
        ),
});

interface LoginFormState {
    email: string;
    password: string;
}

const LoginPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const fromPage = location.state?.from?.pathname || "/";

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<LoginFormState>({
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
    });

    const {
        login,
        loginUserResult: { isLoading },
    } = useLogin();

    const onLoginSubmit: SubmitHandler<ILoginRequest> = async (
        loginRequest
    ) => {
        await login(loginRequest, () => {
            navigate(fromPage, { replace: true });
            toast.success("Welcome back!", {
                toastId: "Welcome back!",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        });
    };

    return (
        <FullScreenImageContainer backgroundImg={LoginBackgroundImage}>
            <FormWrapper variant="login">
                <Form onSubmit={handleSubmit(onLoginSubmit)}>
                    <Typography component="h2">Login</Typography>
                    <Input
                        placeholder="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        label="Email"
                        type="text"
                        {...register("email")}
                    />
                    <PasswordInput
                        placeholder="Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        label="Password"
                        {...register("password")}
                    />

                    <MyPrimaryButton
                        isLoading={isLoading}
                        fullWidth
                        height={40}
                    >
                        Log in
                    </MyPrimaryButton>
                </Form>
                <div>
                    <Typography className="register-text" component="span">
                        Don't have account?
                    </Typography>
                    <Link className="register-btn" to="/signup">
                        Register
                    </Link>
                </div>
            </FormWrapper>
        </FullScreenImageContainer>
    );
};

export default LoginPage;
