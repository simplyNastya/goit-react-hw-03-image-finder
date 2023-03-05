// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

const ImageGallery = children => {
  return (
    <ul className={styles.imageGallery}>
      <ImageGalleryItem />
    </ul>
  );
};

export default ImageGallery;
