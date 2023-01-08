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
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const prevQuery = prevProps.query;
    const { page } = this.state;
    const prevPage = prevState.page;
    if (prevQuery !== query || prevPage !== page) {
      try {
        this.setState({ status: 'panding' });
        const galleryItems = fetchGalleryImages(query, page);
        galleryItems.then(data => {
          const { hits } = data;
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
            status: 'resolved',
          }));
        });
      } catch (error) {
        console.log(error);
        this.setState({ error, status: 'rejected' });
      }
    }
  }
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
            {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
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
