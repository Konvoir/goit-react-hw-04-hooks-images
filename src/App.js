import { useState, useEffect } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { APIpixabay } from "./servises/APIpixabay";
import Loader from "react-loader-spinner";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";

import s from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = async () => {
      try {
        const request = await APIpixabay(searchQuery, currentPage);
        setIsLoaded(true);
        if (images.length > 0) {
          setImages((prevImages) => [...prevImages, ...request]);
          setError(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage, images.length]);

  // if (images.length > 12) {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: "smooth",
  //   });
  // }

  const onChangeQuery = (query) => {
    setImages([]);
    setSearchQuery(query);
    setCurrentPage(1);
    setError(null);
  };

  const toggleModal = () => setShowModal(!showModal);

  const onImageClick = () => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const onButtonClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);

    // fetchImages();
    // scrollPage();
  };

  const shouldRenderMoreButton = images.length > 0 && !isLoaded;

  return (
    <div className={s.container}>
      <Searchbar onSubmit={onChangeQuery}></Searchbar>

      {error && (
        <h2>
          Sorry something went wrong, try again later!(
          {error.message})
        </h2>
      )}

      <ImageGallery images={images} onClick={onImageClick}></ImageGallery>

      {isLoaded && (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )}

      {shouldRenderMoreButton && <Button onClick={onButtonClick} />}

      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tag={tag}
        ></Modal>
      )}
    </div>
  );
};

export default App;

// import React, { Component } from "react";
// import { Searchbar } from "./components/Searchbar/Searchbar";
// import { ImageGallery } from "./components/ImageGallery/ImageGallery";
// import { APIpixabay } from "./servises/APIpixabay";
// import Loader from "react-loader-spinner";
// import { Button } from "./components/Button/Button";
// import { Modal } from "./components/Modal/Modal";

// import s from "./App.module.css";

// class App extends Component {
//   state = {
//     images: [],
//     currentPage: 1,
//     searchQuery: "",
//     isLoaded: false,
//     error: null,
//     showModal: false,
//     largeImageURL: "",
//     tag: "",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, images, currentPage } = this.state;

//     if (
//       prevState.searchQuery !== searchQuery ||
//       prevState.currentPage !== currentPage
//     ) {
//       this.fetchImages();
//     }

//     if (images.length > 12) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }

//   onChangeQuery = (query) => {
//     this.setState({
//       images: [],
//       searchQuery: query,
//       currentPage: 1,
//       error: null,
//     });
//   };

//   fetchImages = () => {
//     const { currentPage, searchQuery } = this.state;
//     const options = { currentPage, searchQuery };

//     this.setState({ isLoaded: true });

//     APIpixabay(options)
//       .then((images) => {
//         if (images.length > 0) {
//           this.setState((prevState) => ({
//             images: [...prevState.images, ...images],

//             error: false,
//           }));
//         } else {
//           this.setState({ error: true });
//         }
//       })
//       .catch(() => this.setState({ error: true }))
//       .finally(() => this.setState({ isLoaded: false }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   onImageClick = (largeImageURL) => {
//     this.setState({
//       largeImageURL: largeImageURL,
//     });
//     this.toggleModal();
//   };

//   onButtonClick = () => {
//     this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
//     this.fetchImages();
//   };

//   render() {
//     const { isLoaded, images, error, showModal, largeImageURL, tag } =
//       this.state;

//     const shouldRenderMoreButton = images.length > 0 && !isLoaded;

//     return (
//       <div className={s.container}>
//         <Searchbar onSubmit={this.onChangeQuery}></Searchbar>

//         {error && (
//           <h2>
//             Sorry something went wrong, try again later!(
//             {error.message})
//           </h2>
//         )}

//         <ImageGallery
//           images={images}
//           onClick={this.onImageClick}
//         ></ImageGallery>

//         {isLoaded && (
//           <Loader type="Puff" color="#00BFFF" height={100} width={100} />
//         )}

//         {shouldRenderMoreButton && <Button onClick={this.onButtonClick} />}

//         {showModal && (
//           <Modal onClose={this.toggleModal}
//            largeImageURL={largeImageURL} tag={tag}>
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// App.propTypes = {};
