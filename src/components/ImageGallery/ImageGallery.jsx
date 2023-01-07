import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import { Gallery, Message } from './ImageGallery.styled';

class ImageGallery extends Component {
  static defaultProps = {
    query: PropTypes.string.isRequired,
  };

  state = {
    status: 'idle',
    gallery: [],
    error: null,
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ status: 'pending', page: 1, gallery:[] });
      this.fetchGallery(query, page);
    } else if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      this.fetchGallery(query, page);
    }
  }

  fetchGallery = () => {
    const { query } = this.props;
    const { page } = this.state;
    const baseURL = 'https://pixabay.com/api/';
    const PARAMS = new URLSearchParams({
      q: `${query}`,
      page: `${page}`,
      key: '31431099-cb6424a99d97f67db3bc0cdc7',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page:12,
    });

    fetch(`${baseURL}?${PARAMS}`)
      .then(res => res.json())
      .then(data => {
        if (!data.hits.length) {
          toast.warn('Please, enter correct search word!');
          return this.setState({ status: 'idle' });
        }

        this.setState(prevState =>( { gallery:[...prevState.gallery,...data.hits], status: 'resolved' }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, status } = this.state;

    if (status === 'idle') {
      return <Message>Please enter a word to start the search</Message>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <Message>Oops ... Something goes wrong </Message>;
    }
    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {gallery.map(({ id, largeImageURL, webformatURL,tags }) => (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </Gallery>
          {gallery.length > 0 && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
