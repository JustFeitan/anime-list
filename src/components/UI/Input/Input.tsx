import React, {HTMLProps} from 'react';
import './Input.scss'

interface InputProps extends HTMLProps<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({helperText, error, label, className, ...props}, ref) => {
    console.log(className)
    return (
        <div className={`input ${className}`}>
            <div className='input__label'>{label}</div>
            <input
                className={error ? `input__field--invalid` : `input__field `}
                {...props}
                ref={ref}
            />
            <div
                className={error ? `input__helper-text--invalid` : `input__helper-text`}
            >
                {helperText}
            </div>
        </div>

    );
});

export default Input;
