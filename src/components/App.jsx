import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery children />
        <Button />
        <Loader />
        {/* <Modal /> */}
      </>
    );
  }
}
