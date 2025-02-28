import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import NoCardData from '@/components/ui/no-data/no-card-data';
import { AppDispatch } from '@/store';
import { useDeleteOriginMutation } from '@/store/api-slice';
import { Origin } from '@/types/entity';

import OriginCard from './origin-card';
import OriginEditForm from './origin-edit-form';

interface IOriginListProps {
  origins: Partial<Origin>[];
}

const OriginList = ({ origins }: IOriginListProps) => {
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<Origin>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditOriginModal, setShowEditOriginModal] = useState(false);

  const handleEditOriginModalClose = () => setShowEditOriginModal(false);
  const handleEditOriginModalShow = () => setShowEditOriginModal(true);
  const [originId, setOriginId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteOrigin, { isLoading }] = useDeleteOriginMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (originId) {
        const response = await deleteOrigin({
          id: originId,
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
  }, [originId, deleteOrigin, dispatch]);
  return (
    <>
      <div className="row g-3 gy-5 py-3 row-deck">
        {origins.length > 0 ? (
          origins.map((origin, index) => (
            <OriginCard
              key={origin.id ?? index++}
              origin={origin}
              setOriginId={setOriginId}
              handleDeleteItemModalShow={handleDeleteItemModalShow}
              handleEditOriginModalShow={handleEditOriginModalShow}
              setUpdateInitialValues={setUpdateInitialValues}
            />
          ))
        ) : (
          <>
            <NoCardData />
          </>
        )}
      </div>
      <OriginEditForm
        show={showEditOriginModal}
        handleClose={handleEditOriginModalClose}
        initialValues={updateInitialValues as Partial<Origin>}
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

export default OriginList;
