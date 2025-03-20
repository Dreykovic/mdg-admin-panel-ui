import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Button, Tabs, Tab, ModalProps, Modal } from 'react-bootstrap';
import { Save, XCircle, Archive, BoxSeam } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import ActionConfirmModal from '@/components/ui/action-confirm-modal';
import LoadingButton from '@/components/ui/buttons/loading-button';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import { Inventory } from '@/types/entity';

import { useEditInventory } from '../../hooks/use-edit-inventory';

import LocationTab from './location-tab';
import OverviewTab from './overview-tab';
import QuantitiesTab from './quantities-tab';

const InventoryEditForm = ({
  show,
  handleClose,
  inventory,
}: ModalProps & {
  inventory: Inventory;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formikRef = useRef<any>(null); // Ref pour accéder à Formik de l'extérieur

  const { initialValues, validationSchema, handleSubmit } = useEditInventory(
    handleClose,
    inventory,
  );

  useEffect(() => {
    dispatch(setPageName({ name: 'edit-inventory', group: 'goods' }));
  }, [dispatch]);

  // Handler déclenché après confirmation du modal
  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    formikRef.current?.submitForm(); // Déclenche le submit de Formik
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="xl"
        centered
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              setIsSubmitting(true);
              await handleSubmit(values);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({ values, resetForm }) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>{`Edit Inventory`}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row flex-row-reverse">
                  <div className="col-sm-12 col-lg-5">
                    <OverviewTab values={values} inventory={inventory} />
                  </div>
                  <div className="col-sm-12 col-lg-7">
                    <Tabs defaultActiveKey="quantities" className="mb-4">
                      <Tab
                        eventKey="quantities"
                        title={
                          <span>
                            <BoxSeam className="me-2" />
                            Quantities
                          </span>
                        }
                      >
                        <QuantitiesTab />
                      </Tab>

                      <Tab
                        eventKey="location"
                        title={
                          <span>
                            <Archive className="me-2" />
                            Warehouse & Status
                          </span>
                        }
                      >
                        <LocationTab />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex justify-content-between border-top pt-4 mt-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => resetForm()}
                    className="d-flex align-items-center"
                    type="button"
                  >
                    <XCircle size={16} className="me-2" />
                    Reset Form
                  </Button>

                  <div>
                    <Button
                      variant="outline-dark"
                      className="me-2"
                      onClick={handleClose}
                    >
                      Cancel and Close
                    </Button>

                    <LoadingButton
                      isLoading={isSubmitting}
                      variant="primary"
                      classes="d-inline-flex align-items-center"
                      icon={<Save size={16} className="me-2" />}
                      type="button"
                      handleClick={() => setShowConfirmModal(true)}
                      text="Submit"
                      loadingText="Submitting..."
                    />
                  </div>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Confirmation Modal */}
      <ActionConfirmModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        confirmHandler={handleConfirmSubmit}
        isLoading={isSubmitting}
        title="Confirm Inventory Edit Submission"
        message="Are you sure you want to submit this inventory updates?"
        confirmText="Yes, Submit"
        cancelText="No, Cancel"
      />
    </>
  );
};

export default InventoryEditForm;
