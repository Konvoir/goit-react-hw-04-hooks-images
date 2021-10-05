import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from "./Modal.module.css"

const modalRoot = document.querySelector("#modalRoot")

export const Modal = ({ toggleModal, largeImageURL, tag }) => {

    useEffect(() => {
        const hendleKeydown = (e) => {
            if (e.code === "Escape") { toggleModal() }
        };
        window.addEventListener("keydown", hendleKeydown);
        return () => {
            window.removeEventListener("keydown", hendleKeydown)
        }
    }, [toggleModal]);
       
    const hendleBackdropClick = (e) => {
        if (e.target === e.currentTarget) { toggleModal() }
    };
    return createPortal(
        <div className={s.Overlay}
            onClick={hendleBackdropClick}
        >
            <div className={s.Modal}>{<img src={largeImageURL} alt={tag} />}</div>
        </div>,
        modalRoot,
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
};







// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { createPortal } from 'react-dom';
// import s from "./Modal.module.css"

// const modalRoot = document.querySelector("#modalRoot")

// export class Modal extends Component {

//     componentDidMount() {
//         window.addEventListener("keydown", this.hendleKeydown)
//     }

//     componentWillUnmount() {
//         window.removeEventListener("keydown", this.hendleKeydown)
//     }

//     hendleKeydown = (e) => {
//         if (e.code === "Escape") {
//             this.props.onClose()
//         }
//     }

//     hendleBackdropClick = (e) => {
//         if (e.target === e.currentTarget) {
//             this.props.onClose()
//         }
//     }

//     render() {
//         return createPortal(
//             <div className={s.Overlay}
//                 onClick={this.hendleBackdropClick}
//             >
//                 <div className={s.Modal}>{ this.props.children}</div>
//             </div>,
//             modalRoot
//         );
//     }
// };

