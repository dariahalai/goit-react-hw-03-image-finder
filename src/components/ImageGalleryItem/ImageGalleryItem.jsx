import Modal from 'components/Modal';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired,
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
    const {id,largeImageURL,webformatURL,tags} = this.props;
    return (
      <>
        <GalleryItem key={id}>
            <GalleryItemImage src={webformatURL} alt={tags} onClick={this.toggleModal}/>
        </GalleryItem>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
