import React, { Component } from 'react';
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
    gallery: [],
    page: 1,
    error: false,
    totalHits: 0,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const prevQuery = prevProps.query;
    const { page } = this.state;
    const prevPage = prevState.page;

    if (prevQuery !== query) {
      this.setState({ loading: true, page: 1, gallery: [] });
      if (page === 1) {
        this.fetchImages(query, page);
      }
    } else if (prevPage !== page) {
      this.setState({ loading: true });
      this.fetchImages(query, page);
    }
  }

  fetchImages = () => {
    const { query } = this.props;
    const { page } = this.state;

    fetchGalleryImages(query, page)
      .then(data => {
        const { hits, totalHits } = data;
        if (!hits.length) {
          return toast.warn('Please, enter correct search word!');
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
        }));
      })

      .catch(error => {
        console.log(error);
        this.setState({ error: true, totalHits: 0 });
      })
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, loading, gallery, totalHits } = this.state;
    const { query } = this.props;
    return (
      <>
        {query === '' && (
          <Message>Please enter a word to start the search</Message>
        )}

        {!error && (
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
        )}

        {loading && <Loader />}

        {error && <Message>Oops ... Something goes wrong </Message>}
      </>
    );
  }
}

export default ImageGallery;
