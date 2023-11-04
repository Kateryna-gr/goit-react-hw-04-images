import { fetchImages } from 'api';
import { ImageGallery } from './image-gallery/image-gallery';
import { SearchBar } from './search-bar/search-bar';
import { Container } from './container.styled';
import { Button } from 'components/button/button';
import { Loader } from 'components/loader/loader';
import { NoImages } from './image-gallery/image-gallery.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = value => {
    if (value && query !== value) {
      setQuery(value);
      setPage(1);
      setImages([]);
      setIsLoading(true);
    }
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!query || !page) {
      return;
    }
    async function onLoadImages() {
      try {
        const response = await fetchImages(query, page);
        if (page > response.totalHits / perPage) {
          setPage(0);
        }
        if (response.totalHits === 0) {
          setImages([]);
          setPage(0);
        } else {
          setImages(prevState => [...prevState, ...response.hits]);
        }
      } catch (error) {
        setPage(0);
      } finally {
        setIsLoading(false);
      }
    }

    onLoadImages();
  }, [query, page]);

  return (
    <Container>
      <SearchBar searchImages={onSearch} />

      {images.length ? (
        <ImageGallery images={images} />
      ) : (
        <NoImages>No images</NoImages>
      )}
      {isLoading && <Loader />}
      {page > 0 && !isLoading && <Button loadMore={loadMoreImages} />}
    </Container>
  );
};
