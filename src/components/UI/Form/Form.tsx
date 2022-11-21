import React, {FC, HTMLProps} from 'react';
import './Form.scss'
interface FormProps extends HTMLProps<HTMLFormElement>{
    children: JSX.Element | JSX.Element[];
}

const Form: FC<FormProps> = ({children, ...props}) => {
    return (
        <form noValidate className='form' {...props}>
            {children}
        </form>
    );
};

export default Form;
