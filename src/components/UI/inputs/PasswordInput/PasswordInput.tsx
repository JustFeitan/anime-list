import React, { HTMLProps, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import IconButton from "../../buttons/IconButton/IconButton";
import Input, { InputProps } from "../Input/Input";

interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ ...props }, ref) => {
        const [passwordShown, setPasswordShown] = useState<boolean>(false);
        const togglePassword = () => {
            setPasswordShown((prevState) => !prevState);
        };

        return (
            <Input
                placeholder="Password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                endItem={
                    <IconButton onClick={togglePassword}>
                        {passwordShown ? (
                            <MdVisibility size={20} />
                        ) : (
                            <MdVisibilityOff size={20} />
                        )}
                    </IconButton>
                }
                {...props}
                ref={ref}
            />
        );
    }
);

export default PasswordInput;
