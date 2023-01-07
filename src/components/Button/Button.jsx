import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({onClick}) => {
  return <ButtonLoadMore type='button' onClick={onClick}>
    Load More
    </ButtonLoadMore>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
