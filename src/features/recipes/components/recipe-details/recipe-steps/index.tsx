import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import CardLoading from '@/components/ui/loading/card-loading';
import NoCardData from '@/components/ui/no-data/no-card-data';
import {
  useDeleteStepMutation,
  useGetStepsQuery,
} from '@/features/recipes/store/step-api';

import { Step } from '@/types/entity';

import StepCreateForm from './add-step';
import StepEditForm from './edit-step';
import StepItem from './step-item';
import { AppDispatch } from '@/store';
type Props = {
  recipeId: number;
};
const StepSteps = ({ recipeId }: Props) => {
  const [showCreateStepModal, setShowCreateStepModal] = useState(false);

  const handleCreateStepModalClose = () => setShowCreateStepModal(false);
  const handleCreateStepModalShow = () => setShowCreateStepModal(true);
  // Créer l'objet `filter`
  const filters = { recipeId };
  // Récupération des categories
  const { data: stepsResponse, isFetching: isStepsFetching } = useGetStepsQuery(
    { filters: JSON.stringify(filters ?? '') },
    {
      refetchOnMountOrArgChange: false,
    },
  );
  const steps = stepsResponse?.content.steps;

  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<Step>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);

  const handleEditStepModalClose = () => setShowEditSupplierModal(false);
  const handleEditStepModalShow = () => setShowEditSupplierModal(true);
  const [stepId, setStepId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteStep, { isLoading }] = useDeleteStepMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (stepId) {
        const response = await deleteStep({
          id: stepId,
        }).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Success !',
              message: response.message,
            }),
          );
        }
      } else {
        throw new Error('No data provided');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Error !',
          message: 'An error occurred during deletion' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [stepId, deleteStep, dispatch]);
  return (
    <>
      <div className="card mb-3 shadow">
        <div className="card-header p-3 no-bg bg-transparent d-flex align-items-center justify-content-between border-bottom flex-wrap">
          <h3 className="">Steps</h3>
          <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
            <button
              type="button"
              className="btn btn-dark w-sm-100"
              onClick={handleCreateStepModalShow}
            >
              <i className="icofont-plus-circle me-2 fs-6"></i>Add
            </button>
          </div>
        </div>
        <div className="card-body">
          {isStepsFetching ? (
            <CardLoading number={1} />
          ) : (
            <div className="planned_task client_task">
              <div className="dd">
                {steps && steps.length > 0 ? (
                  <ol className="dd-list">
                    {steps.map((step, index) => (
                      <StepItem
                        key={index}
                        step={step}
                        setStepId={setStepId}
                        handleDeleteItemModalShow={handleDeleteItemModalShow}
                        handleEditStepModalShow={handleEditStepModalShow}
                        setUpdateInitialValues={setUpdateInitialValues}
                      />
                    ))}
                  </ol>
                ) : (
                  <>
                    <NoCardData text="No Step" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <StepCreateForm
        show={showCreateStepModal}
        handleClose={handleCreateStepModalClose}
        recipeId={recipeId}
      />
      <StepEditForm
        show={showEditSupplierModal}
        handleClose={handleEditStepModalClose}
        initialValues={updateInitialValues as Partial<Step>}
      />
      <DeletionConfirmModal
        show={showDeleteItemModal}
        handleClose={handleDeleteItemModalClose}
        isLoading={isLoading}
        deleteHandler={handleDeletion}
      />
    </>
  );
};

export default StepSteps;
