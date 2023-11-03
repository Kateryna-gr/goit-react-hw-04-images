import { Component, Fragment } from 'react';
import { ItemImage } from './image-gallery.styled';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(55, 55, 55, 0.75)',
  },
  content: {
    maxWidth: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#3f51b5',
    border: 'none',
    padding: 3,
  },
};

Modal.setAppElement('#root');

export class GalleryItemImage extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { small, large, alt } = this.props;
    return (
      <Fragment>
        <ItemImage onClick={this.openModal} src={small} alt={alt} />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <img src={large} alt={alt} />
        </Modal>
      </Fragment>
    );
  }
}
