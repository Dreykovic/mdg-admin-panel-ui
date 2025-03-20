import { ModalProps, Modal } from 'react-bootstrap';

import LoadingButton from './buttons/loading-button';

interface IActionConfirmModal {
  title?: string;
  message?: string;
  isLoading: boolean;
  confirmHandler: () => void;
  confirmText?: string;
  cancelText?: string;
  iconClass?: string;
}

const ActionConfirmModal = ({
  show,
  handleClose,
  confirmHandler,
  isLoading,
  title = 'Are you sure you want to proceed?',
  message = 'This action is irreversible. Please confirm if you want to continue.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  iconClass = 'icofont-exclamation-circle text-warning display-2 text-center mt-2',
}: ModalProps & IActionConfirmModal) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body justify-content-center flex-column d-flex">
          <i className={`${iconClass}  display-2 text-center mt-2`}></i>
          <p className="mt-4 fs-5 text-center">{message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          {cancelText}
        </button>
        <LoadingButton
          isLoading={isLoading}
          text={confirmText}
          type="button"
          classes="btn btn-primary"
          handleClick={confirmHandler}
          loadingText="Processing..."
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ActionConfirmModal;
