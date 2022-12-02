import {ComponentProps, FC} from 'react';
import './FormWrapper.scss';

interface LoginFormWrapperProps extends ComponentProps<'div'>{
    variant?: 'default' | 'login'
}

const LoginFormWrapper: FC<LoginFormWrapperProps> = ({variant = 'default', className, children, ...props}) => {
    let variantClassName;

    if (variant === 'default') variantClassName = 'form-wrapper';
    if (variant === 'login') variantClassName = 'form-wrapper login';

    return (
        <div className={className? `${variantClassName} ${className}` : `${variantClassName}`}>
            {children}
        </div>
    );
};

export default LoginFormWrapper;
