import { ButtonLoadMore } from './button.styled';

export const Button = ({loadMore}) => {
  return <ButtonLoadMore type='button' onClick={loadMore}>Load more</ButtonLoadMore>;
};
