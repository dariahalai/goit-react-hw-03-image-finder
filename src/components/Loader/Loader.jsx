import { LoaderContainer } from './Loader.styled';
import { Vortex } from 'react-loader-spinner';
const Loader = () => {
  return (
    <LoaderContainer>
      <Vortex
        visible={true}
        height="250"
        width="250"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </LoaderContainer>
  );
};
export default Loader;
