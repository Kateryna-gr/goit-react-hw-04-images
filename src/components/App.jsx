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
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);

  const onInput = value => {
    if (value && query !== value) {
      setQuery(value);
    }
  };

  const loadMoreImages = () => {
    console.log(page);
    const nextPage = page + 1;
    setPage(nextPage);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function onLoadImages() {
      setIsLoading(true);
      try {
        const response = await fetchImages(query, 1);
        console.log(response.totalHits);
        if (response.totalHits === 0) {
          setImages([]);
          setPage(0);
        } else {
          setImages([...response.hits]);
          setPage(2);
        }
      } catch (error) {
        setPage(0);
      } finally {
        setIsLoading(false);
      }
    }

    onLoadImages();
  }, [query]);

  useEffect(() => {
    console.log(page);
    if (!query || !page) {
      return;
    }
    async function onLoadMoreImages() {
      setIsLoading(true);
      try {
        const response = await fetchImages(query, page);
        console.log(response.totalHits);
        if (page > response.totalHits / perPage) {
          setPage(0);
        }
        setImages(prevState => [...prevState, ...response.hits]);
      } catch (error) {
        setPage(0);
      } finally {
        setIsLoading(false);
      }
    }

    onLoadMoreImages();
  }, [query, page]);

  return (
    <Container>
      <SearchBar searchImages={onInput} />

      {images.length ? (
        <ImageGallery images={images} />
      ) : (
        <NoImages>No images</NoImages>
      )}
      {isLoading && <Loader />}
      {page > 1 && <Button loadMore={loadMoreImages} />}
    </Container>
  );
};
