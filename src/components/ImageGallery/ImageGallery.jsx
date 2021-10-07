import { Fragment, useEffect, useState } from "react";
import {ImageGalleryItem} from "../ImageGalleryItem/ImageGalleryItem"
// import PropTypes from 'prop-types';
import s from "./ImageGallery.module.css"

import { APIpixabay } from "../../servises/APIpixabay";
import Loader from "react-loader-spinner";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";




export const ImageGallery = (props) => {

    const [images, setImages] = useState([]);
    const [largeImageURL, setLargeImageURL] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        if (props.searchQuery) {
            setImages([]);
            fetchImages();
        }
    }, [props.searchQuery]);

    function fetchImages() {
        setIsLoaded(true);

        setTimeout(() => {
            APIpixabay
                .getData(props.searchQuery, props.page)
                .then(data => {
                    if (props.page === 1) {
                        setImages(data.hits);
                    } else {
                        setImages(prevState => [...prevState, ...data.hits]);
                        window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: 'smooth',
                        });
                    }
                })
                .finally(() => {
                    setIsLoaded(false);
                    props.setPage(prevState => prevState + 1);
                });
        }, 200);
    }
        const openModal = largeImage => {
            setShowModal(true);
            setLargeImageURL(largeImage);
        };

        const closeModal = () => {
            setShowModal(false);
            setLargeImageURL('');
        };

        return (
            <Fragment>
                <ul className={s.ImageGallery} >
                    {/* <!-- Набор <li> с изображениями --> */}
       
                    <ImageGalleryItem imageQuery={images} openModal={openModal} />
                </ul>
                {images.length === 0 && (
                    <p>{`No images for your request "${props.searchQuery}"`}</p>
                )}
                {showModal && (
                    <Modal closeModal={closeModal} largeImageURL={largeImageURL} />
                )}
                {isLoaded && <Loader />}
                {images.length > 0 && <Button onClick={fetchImages} />}
        
            </Fragment>
        )
    
}


    
 
 
// ImageGallery.propTypes = {
//     images: PropTypes.array.isRequired,
//     onClick: PropTypes.func.isRequired,
// };