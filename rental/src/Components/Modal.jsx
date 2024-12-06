import React, { useState } from 'react';
import './Modal.css';

const Modal = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Modal Title</h2>
                <p>This is a centered modal with a blurred background.</p>
            </div>
        </div>
    );
};

export default Modal;