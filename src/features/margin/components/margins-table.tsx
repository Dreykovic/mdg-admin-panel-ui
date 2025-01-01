import { MarginLevel } from '@/types/entity';

import { useCallback, useState } from 'react';

import { useDeleteMarginMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

import NoTableData from '@/components/ui/no-data/no-table-data';
import { showAlert } from '@/components/ui/alerts/alert-slice';

import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import MarginRow from './margin-row';
import MarginEditForm from './margin-edit-form';
interface IMarginListProps {
  margins: Partial<MarginLevel>[];
}
const MarginsTable = ({ margins }: IMarginListProps) => {
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<MarginLevel>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);

  const handleEditMarginModalClose = () => setShowEditSupplierModal(false);
  const handleEditMarginModalShow = () => setShowEditSupplierModal(true);
  const [marginId, setMarginId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteMargin, { isLoading }] = useDeleteMarginMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (marginId) {
        const response = await deleteMargin({
          id: marginId,
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
  }, [marginId]);
  return (
    <>
      <div className="card-body">
        <table
          id="departmentTable"
          className="table table-hover table-striped align-middle mb-0"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {margins.length > 0 ? (
              margins.map((margin, index) => (
                <MarginRow
                  margin={margin}
                  key={margin.id ?? index++}
                  setMarginId={setMarginId}
                  handleDeleteItemModalShow={handleDeleteItemModalShow}
                  handleEditMarginModalShow={handleEditMarginModalShow}
                  setUpdateInitialValues={setUpdateInitialValues}
                />
              ))
            ) : (
              <>
                <NoTableData number={3} />
              </>
            )}
          </tbody>
        </table>
      </div>
      <MarginEditForm
        show={showEditSupplierModal}
        handleClose={handleEditMarginModalClose}
        initialValues={updateInitialValues as Partial<MarginLevel>}
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

export default MarginsTable;
