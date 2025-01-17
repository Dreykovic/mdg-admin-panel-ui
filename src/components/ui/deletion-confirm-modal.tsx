import { ModalProps, Modal } from 'react-bootstrap';

import LoadingButton from './buttons/loading-button';
interface IDeleteModal {
  title?: string;
  message?: string;
  isLoading: boolean;
  deleteHandler: () => void;
}
const DeletionConfirmModal = ({
  show,
  handleClose,
  deleteHandler,
  isLoading,
  title = 'Delete Permanently?',
  message = 'Are you sure you want to delete this item? This action is irreversible and may lead to the loss of other data.',
}: ModalProps & IDeleteModal) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body justify-content-center flex-column d-flex">
            <i className="icofont-ui-delete text-primary display-2 text-center mt-2"></i>
            <p className="mt-4 fs-5 text-center ">{message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Cancel
          </button>

          <LoadingButton
            isLoading={isLoading}
            text="Delete"
            type="button"
            classes="btn btn-danger color-fff"
            handleClick={deleteHandler}
            loadingText="Deleting"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletionConfirmModal;
