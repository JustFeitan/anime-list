import React, {FC} from 'react';
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";
import './LoginPage.scss';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import MyPrimaryButton from "../../components/UI/buttons/MyPrimaryButton/MyPrimaryButton";


const schema = yup.object().shape({
    username: yup
        .string()
        .required('Username required')
        .matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username have to 8 - 20 length, without \".\" and _')
        ,
    password: yup
        .string()
        .required('Password required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'At least 8 symbols, one uppercase letter, one lowercase letter and one number')
       ,

})

interface AuthFormState {
    username: string;
    password: string;
}

const LoginPage: FC = () => {

    const {register, formState: {errors}, handleSubmit, getValues} = useForm<AuthFormState>({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    console.log(errors)
    console.log(getValues())
    return (
        <div className='login-bg'>
            <div className="login">
                <Form>
                    <span className='login__title'>Login</span>
                    <Input
                        className='login__title__input'
                        placeholder='Email or username'
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        label='Username'
                        type='text'
                        {...register('username')}
                    />
                    <Input
                        placeholder='Password'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        label='Password'
                        type='password'
                        {...register('password')}
                    />
                    <MyPrimaryButton width='200px' height='40px' type='submit'>Log in</MyPrimaryButton>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
