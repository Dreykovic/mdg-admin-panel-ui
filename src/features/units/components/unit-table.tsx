import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import NoTableData from '@/components/ui/no-data/no-table-data';
import { AppDispatch } from '@/store';
import { useDeleteUnitMutation } from '@/services/unit-of-measure';
import { UnitOfMeasure } from '@/types/entity';

import UnitEditForm from './unit-edit-form';
import UnitRow from './unit-row';

interface IUnitListProps {
  units: Partial<UnitOfMeasure>[];
}
const UnitsTable = ({ units }: IUnitListProps) => {
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<UnitOfMeasure>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);

  const handleEditUnitModalClose = () => setShowEditSupplierModal(false);
  const handleEditUnitModalShow = () => setShowEditSupplierModal(true);
  const [unitId, setUnitId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteUnit, { isLoading }] = useDeleteUnitMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (unitId) {
        const response = await deleteUnit({
          id: unitId,
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
  }, [unitId, deleteUnit, dispatch]);
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
              <th>Type</th>
              <th>Factor</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.length > 0 ? (
              units.map((unit, index) => (
                <UnitRow
                  unit={unit}
                  key={unit.id ?? index++}
                  setUnitId={setUnitId}
                  handleDeleteItemModalShow={handleDeleteItemModalShow}
                  handleEditUnitModalShow={handleEditUnitModalShow}
                  setUpdateInitialValues={setUpdateInitialValues}
                />
              ))
            ) : (
              <>
                <NoTableData number={4} />
              </>
            )}
          </tbody>
        </table>
      </div>
      <UnitEditForm
        show={showEditSupplierModal}
        handleClose={handleEditUnitModalClose}
        initialValues={updateInitialValues as Partial<UnitOfMeasure>}
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

export default UnitsTable;
