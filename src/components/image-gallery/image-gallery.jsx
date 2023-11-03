import { GalleryItemImage } from './image-gallery-item';
import { GalleryList, GalleryItem } from './image-gallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(image => {
        return (
          <GalleryItem key={image.id}>
            <GalleryItemImage
              small={image.webformatURL}
              large={image.largeImageURL}
              alt={image.tags}
            />
          </GalleryItem>
        );
      })}
    </GalleryList>
  );
};
