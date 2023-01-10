import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import { Gallery, Message } from './ImageGallery.styled';
import { fetchGalleryImages } from 'services/apiGallery';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    status: 'idle',
    gallery: [],
    page: 1,
    error: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const prevQuery = prevProps.query;
    const { page } = this.state;
    const prevPage = prevState.page;

    if (prevQuery !== query) {
      this.setState({ status: 'pending', gallery: [], page: 1 });
      if (page === 1) {
        this.fetchImages(query, page);
      }
    } else if (prevPage !== page) {
      this.setState({ status: 'pending' });
      this.fetchImages(query, page);
    }
  }

  fetchImages = () => {
    const { query } = this.props;
    const { page } = this.state;
    try {
      const galleryItems = fetchGalleryImages(query, page);
      galleryItems.then(data => {
        const { hits, totalHits } = data;
        if (!hits.length) {
          toast.warn('Please, enter correct search word!');
          return this.setState({ status: 'idle' });
        }
        const newItems = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newItems],
          totalHits,
          status: 'resolved',
        }));
      });
    } catch (error) {
      console.log(error);
      this.setState({ error, status: 'rejected', totalHits: 0 });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, status, totalHits } = this.state;

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
            {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </Gallery>
          {gallery.length < totalHits && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
