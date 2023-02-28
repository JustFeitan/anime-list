import React, { FC, HTMLProps, ReactNode } from "react";

import "./Form.scss";

interface FormProps extends HTMLProps<HTMLFormElement> {
    children: JSX.Element | JSX.Element[] | ReactNode;
}

const Form: FC<FormProps> = ({ children, className, ...props }) => {
    return (
        <form
            noValidate
            className={className ? `form ${className}` : "form"}
            {...props}
        >
            {children}
        </form>
    );
};

export default Form;
