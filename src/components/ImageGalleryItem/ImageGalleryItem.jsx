import s from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ imageQuery, openModal }) => {
    return (
        <>
     
            {imageQuery.map(({ id, webformatURL, largeImageURL, tags }) => (
                <li key={id} className={s.ImageGalleryItem}
                onClick={() => openModal(largeImageURL)}>
         <img 
            src={webformatURL}
            alt={tags}
            className={s.ImageGalleryItemImage}
                    />
             </li>        
            ) )}
        </>
    )
}