import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import { AppDispatch } from '@/store';
import { useDeleteMarginMutation } from '@/store/api/margin-level';
import { MarginLevel } from '@/types/entity';

export const useMargins = () => {
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<MarginLevel>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);
  const [marginId, setMarginId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();
  const [deleteMargin, { isLoading }] = useDeleteMarginMutation();

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);

  const handleEditMarginModalClose = () => setShowEditSupplierModal(false);
  const handleEditMarginModalShow = () => setShowEditSupplierModal(true);

  const handleDeletion = useCallback(async () => {
    try {
      if (marginId) {
        const response = await deleteMargin({ id: marginId }).unwrap();

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Success!',
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
          title: 'Error!',
          message: 'An error occurred during deletion' + JSON.stringify(error),
          success: false,
        }),
      );
    } finally {
      handleDeleteItemModalClose();
    }
  }, [marginId, deleteMargin, dispatch]);

  return {
    updateInitialValues,
    setUpdateInitialValues,
    showDeleteItemModal,
    handleDeleteItemModalClose,
    handleDeleteItemModalShow,
    showEditSupplierModal,
    handleEditMarginModalClose,
    handleEditMarginModalShow,
    marginId,
    setMarginId,
    isLoading,
    handleDeletion,
  };
};
