import { RotatingLines } from 'react-loader-spinner';
import { LoaderDiv } from './loader.styled';

export const Loader = () => {
  return (
    <LoaderDiv>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="2"
        animationDuration="0.8"
        width="100"
        visible={true}
      />
    </LoaderDiv>
  );
};
