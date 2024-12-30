import { ModalProps, Modal } from 'react-bootstrap';

import LoadingButton from './loading-button';
interface IDeleteModal {
  title?: string;
  message?: string;
  isLoading: boolean;
  deleteHandler: () => {};
}
const DeletionConfirmModal = ({
  show,
  handleClose,
  deleteHandler,
  isLoading,
  title = 'Supprimer Définitivement ??',
  message = "Êtes vous sûr de supprimer ce élément? Cette action est irreversible et peut entraîner la perte d'autres donnés",
}: ModalProps & IDeleteModal) => {
  return (
    <>
      {' '}
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
            <i className="icofont-ui-delete text-danger display-2 text-center mt-2"></i>
            <p className="mt-4 fs-5 text-center ">{message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Annuler
          </button>

          <LoadingButton
            isLoading={isLoading}
            text="Supprimer"
            type="button"
            classes="btn btn-danger color-fff"
            handleClick={deleteHandler}
            loadingText="Suppression"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletionConfirmModal;
