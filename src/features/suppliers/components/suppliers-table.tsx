import { Supplier } from '@/types/entity';
import SupplierRow from './supplier-row';
import { useCallback, useState } from 'react';

import { useDeleteSupplierMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

import NoTableData from '@/components/ui/no-data/no-table-data';
import { showAlert } from '@/components/ui/alerts/alert-slice';
import SupplierEditForm from './supplier-edit-form';
import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
interface ISupplierListProps {
  suppliers: Partial<Supplier>[];
}
const SuppliersTable = ({ suppliers }: ISupplierListProps) => {
  const [updateInitialValues, setUpdateInitialValues] =
    useState<Partial<Supplier>>();
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);

  const handleDeleteItemModalClose = () => setShowDeleteItemModal(false);
  const handleDeleteItemModalShow = () => setShowDeleteItemModal(true);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);

  const handleEditSupplierModalClose = () => setShowEditSupplierModal(false);
  const handleEditSupplierModalShow = () => setShowEditSupplierModal(true);
  const [supplierId, setSupplierId] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  const [deleteSupplier, { isLoading }] = useDeleteSupplierMutation();

  const handleDeletion = useCallback(async () => {
    try {
      if (supplierId) {
        const response = await deleteSupplier({
          id: supplierId,
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
  }, [supplierId]);
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
              <th>Address1</th>
              <th>City</th>
              <th>PostalCode</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <SupplierRow
                  supplier={supplier}
                  key={supplier.id ?? index++}
                  setSupplierId={setSupplierId}
                  handleDeleteItemModalShow={handleDeleteItemModalShow}
                  handleEditSupplierModalShow={handleEditSupplierModalShow}
                  setUpdateInitialValues={setUpdateInitialValues}
                />
              ))
            ) : (
              <>
                <NoTableData number={6} />
              </>
            )}
          </tbody>
        </table>
      </div>
      <SupplierEditForm
        show={showEditSupplierModal}
        handleClose={handleEditSupplierModalClose}
        initialValues={updateInitialValues as Partial<Supplier>}
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

export default SuppliersTable;
