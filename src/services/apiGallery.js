import axios from 'axios';
import PropTypes from 'prop-types';
export function fetchGalleryImages(query, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=31431099-cb6424a99d97f67db3bc0cdc7&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
fetchGalleryImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
