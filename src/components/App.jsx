import { Component } from 'react';
import { fetchImages } from 'api';
import { ImageGallery } from './image-gallery/image-gallery';
import { SearchBar } from './search-bar/search-bar';
import { Container } from './container.styled';
import { Button } from 'components/button/button';
import { Loader } from 'components/loader/loader';
import { NoImages } from './image-gallery/image-gallery.styled';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 0,
    perPage: 12,
    isLoading: false,
  };

  onInput = value => {
    console.log(value);
    if (value && this.state.query !== value) {
      this.setState({ query: value });
      this.onSearch();
    }
  };

  async onSearch() {
    console.log(this.state.query);
    this.setState({ isLoading: true });
    try {
      const response = await fetchImages(this.state.query, 1);
      this.setState({ images: response.hits, page: 1 });
      if (this.state.page > response.totalHits / this.state.perPage + 1) {
        this.setState({ page: 0 });
      }
    } catch (error) {
      this.setState({ error, page: 0 });
    } finally {
      this.setState({ isLoading: false });
    }
    console.log(this.state);
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.onLoadMore();
  };

  async onLoadMore() {
    this.setState({ isLoading: true });
    try {
      const response = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
      }));
      if (this.state.page > response.totalHits / 12 + 1) {
        this.setState({ page: 0 });
      }
    } catch (error) {
      this.setState({ error, page: 0 });
    } finally {
      this.setState({ isLoading: false });
    }
    console.log(this.state);
  }

  render() {
    const { images, page, isLoading } = this.state;
    return (
      <Container>
        <SearchBar searchImages={this.onInput} />

        {images.length ? (
          <ImageGallery images={images} />
        ) : (
          <NoImages>No images</NoImages>
        )}
        {isLoading && <Loader />}
        {page > 0 && <Button loadMore={this.loadMoreImages} />}
      </Container>
    );
  }
}
