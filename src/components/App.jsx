import { Component } from 'react';
import axios from 'axios';
import { LineWave } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ErrorMessage from './Message/ErrorMessage';
import WarningMessage from './Message/WarningMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
// import Loader from './Loader/Loader';
import '../index.css';

const API_KEY = '33057333-6c82ba77f09b588ec1ac95420';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    searchRequest: '',
    loader: false,
    error: '',
    message: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchRequest, page } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchPost();
    }
  }

  getPost = (searchRequest, page = 1) => {
    return axios.get(
      `https://pixabay.com/api/?q=${searchRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  async fetchPost() {
    const { searchRequest, page } = this.state;

    try {
      this.setState({ loader: true, message: false });
      const {
        data: { hits },
      } = await this.getPost(searchRequest, page);
      hits.length
        ? this.setState(prevState => ({
            items: [...prevState.items, ...hits],
          }))
        : this.setState({ items: [], message: true });
    } catch ({ response: { data } }) {
      this.setState({
        error:
          data || 'Error! Unable to load the image, please try again later!',
      });
    } finally {
      this.setState({ loader: false });
    }
  }

  submitHandler = searchValue => {
    this.setState({
      items: [],
      page: 1,
      searchRequest: searchValue,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImageURL,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { items, loader, error, message, showModal, largeImageURL, tags } =
      this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.submitHandler} />
        {error && <ErrorMessage error={error} />}
        {message && <WarningMessage />}
        <ImageGallery items={items} showModal={this.showModal} />
        {loader && (
          <LineWave
            color="#8se36t"
            ariaLabel="lineWave-loading"
            wrapperClass="Loader"
          />
        )}
        {Boolean(items.length) && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
