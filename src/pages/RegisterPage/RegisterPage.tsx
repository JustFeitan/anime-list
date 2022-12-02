import {FC} from 'react';
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

const registerSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required field')
        .matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username should be from 8 to 20 characters and without _ and .'),
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

    const {register, handleSubmit, formState: {errors}} = useForm<SignupFormState>({
        mode: "onBlur",
        resolver: yupResolver(registerSchema)
    });

    const onSignUpSubmit: SubmitHandler<ISignUpRequest> = (signUpRequest) => {

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
                    <MyPrimaryButton fullWidth>Sign up</MyPrimaryButton>
                </Form>
            </FormWrapper>
        </FullScreenImageContainer>
    );
};

export default SignUpPage;
