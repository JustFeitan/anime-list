import React, {
    AriaAttributes,
    ComponentProps,
    DetailedHTMLProps,
    HTMLAttributes,
    HTMLProps,
    InputHTMLAttributes
} from 'react';
import './Input.scss'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, AriaAttributes {
    label?: string;
    helperText?: string;
    error?: boolean;
    className?: string;
    endItem?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
                                                                  helperText,
                                                                  error,
                                                                  label,
                                                                  className,
                                                                  endItem,
                                                                  ...props
                                                              }, ref) => {

    return (
        <div className={'input'}>
            {
                label && <div className='input__label'>{label}</div>
            }

            <div className='input__wrapper'>
                <input
                    className={
                        error
                            ? `input__field--invalid`
                            : className
                                ? `input__field ${className}`
                                : `input__field`
                    }
                    {...props}
                    ref={ref}
                />
                {endItem &&
                    <div className='input__icon'>
                        {endItem}
                    </div>
                }
            </div>

            {helperText &&
                <div
                    className={error ? `input__helper-text--invalid` : `input__helper-text`}
                >
                    {helperText}
                </div>
            }

        </div>

    );
});

export default Input;
