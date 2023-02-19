import React, {FC} from 'react';
import FullScreenImageContainer from "../../components/UI/FullScreenImageContainer/FullScreenImageContainer";
import FormWrapper from "../../components/UI/FormWrapper/FormWrapper";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/inputs/Input/Input";
import MyPrimaryButton from "../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";
import {SubmitHandler, useForm} from "react-hook-form";
import Typography from "../../components/UI/Typography/Typography";
import PasswordInput from "../../components/UI/inputs/PasswordInput/PasswordInput";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../LoginPage/LoginPage";
import {ISignUpRequest} from "../../models/User/IRegisterRequest";
import {useSignUp} from "../../hooks/useSignUp";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import './SignUpPage.scss';
import defaultAvatar from './../../assets/hot.png';
import {formDataFromObject} from "../../utils/formDataFromObject";
import {authApi} from "../../services/AuthService";

const registerSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required field')
        .matches(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username should be from 4 to 20 characters and without _ and .'),
    repeatedPassword: yup
        .string()
        .required('Yuo have to repeat password')
        .oneOf([yup.ref('password')], 'The passwords do not match'),
}).concat(loginSchema)


interface SignupFormState {
    username: string;
    email: string;
    password: string;
    repeatedPassword: string;
}

const SignUpPage: FC = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const fromPage = location.state?.from?.pathname;

    const {register, handleSubmit, formState: {errors}, unregister} = useForm<SignupFormState>({
        mode: "onBlur",
        resolver: yupResolver(registerSchema)
    });

    const {signup, signUpUserResult: {isLoading}} = useSignUp();
    const [updateUser, {}] = authApi.useUpdateUserMutation();



    const onSignUpSubmit: SubmitHandler<Omit<SignupFormState, 'repeatedPassword'>> = async (signUpRequest) => {
        unregister('repeatedPassword');
        const newUser: ISignUpRequest = {
            ...signUpRequest,
            userAvatar: defaultAvatar,
            profileCover: defaultAvatar,
        }
        await signup(newUser, () => {
            navigate(fromPage, {replace: true});
            toast.success('Thank you for registration! Have fun!', {
                toastId: 'Thank you for registration! Have fun!',
                position: toast.POSITION.BOTTOM_CENTER,
            });
        })


    }

    return (
        <FullScreenImageContainer backgroundImg=''>
            <FormWrapper variant='login'>
                <Form onSubmit={handleSubmit(onSignUpSubmit)}>
                    <Typography component='h2'>Registration</Typography>
                    <Input
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        placeholder='Username'
                        label='Username'
                        {...register('username')}
                    />
                    <Input
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        placeholder='Email'
                        label='Email'
                        {...register('email')}
                    />
                    <PasswordInput
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        placeholder='Password'
                        label='Password'
                        {...register('password')}
                    />
                    <PasswordInput
                        error={!!errors.repeatedPassword}
                        helperText={errors.repeatedPassword?.message}
                        placeholder='Repeat password'
                        label='Repeat password'
                        {...register('repeatedPassword')}
                    />

                    <MyPrimaryButton isLoading={isLoading} fullWidth height={40}>
                        Sign up
                    </MyPrimaryButton>
                </Form>
                <div>
                    <Typography className='login-text' component='span'>
                        Already have an account?
                    </Typography>
                    <Link className='login-btn' to='/login'>Login</Link>
                </div>
            </FormWrapper>
        </FullScreenImageContainer>
    );
};

export default SignUpPage;
