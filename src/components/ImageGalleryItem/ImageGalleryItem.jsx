import Modal from 'components/Modal';
import React, { PureComponent } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
class ImageGalleryItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { id, largeImageURL, webformatURL, tags } = this.props;
    return (
      <GalleryItem onClick={this.toggleModal}>
        <GalleryItemImage id={id} src={webformatURL} alt={tags} large={largeImageURL} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
