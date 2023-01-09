import axios from 'axios';
import PropTypes from 'prop-types';


const baseURL = 'https://pixabay.com/api/';

export async function fetchGalleryImages(query,page) {
  const PARAMS = new URLSearchParams({
    q: `${query}`,
    page: `${page}`,
    key: '31431099-cb6424a99d97f67db3bc0cdc7',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page:12,
  });
  const API = baseURL+"?"+PARAMS;
  const response =  await axios.get(API);
  return response.data;
}
fetchGalleryImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

// `https://pixabay.com/api/?q=${query}&page=${page}&key=31431099-cb6424a99d97f67db3bc0cdc7&image_type=photo&orientation=horizontal&per_page=12`