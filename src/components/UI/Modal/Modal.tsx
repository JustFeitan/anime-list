import React, {FC, ReactChild} from 'react';
import classes from './Modal.module.scss'

interface ModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    children: ReactChild | React.ReactNode;
}

const Modal: FC<ModalProps> = ({visible, children, setVisible}) => {
    const rootClasses = [classes.modal];

    if (visible) {
        rootClasses.push(classes.visible)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalWrapper} onClick={event => event.stopPropagation()}>
                <div className={classes.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
