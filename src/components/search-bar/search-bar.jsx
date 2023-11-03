import { Formik } from 'formik';
import {
  HeaderSearch,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './search-bar.styled';
import { BiSearchAlt } from 'react-icons/bi';

export const SearchBar = ({ searchImages }) => {
  return (
    <HeaderSearch>
      <Formik
        initialValues={{ input: '' }}
        onSubmit={values => {
          searchImages(values.input);
        }}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <BiSearchAlt size={32} />
          </SearchFormButton>
          <SearchFormInput
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </HeaderSearch>
  );
};
