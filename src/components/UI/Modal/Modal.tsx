import React, { ComponentProps, FC, ReactChild } from "react";

import classes from "./Modal.module.scss";

interface ModalProps extends ComponentProps<"div"> {
    visible: boolean;
    setVisible?: (visible: boolean) => void;
    children: ReactChild | React.ReactNode;
}

const Modal: FC<ModalProps> = ({
    visible,
    children,
    setVisible,
    className,
    ...props
}) => {
    const rootClasses = [classes.modal];

    if (visible) {
        rootClasses.push(classes.visible);
    }

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={() => {
                setVisible ? setVisible(false) : (visible = false);
            }}
        >
            <div
                className={
                    className
                        ? classes.modalWrapper + " " + className
                        : classes.modalWrapper
                }
                onClick={(event) => event.stopPropagation()}
            >
                <div className={classes.modalContent}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
