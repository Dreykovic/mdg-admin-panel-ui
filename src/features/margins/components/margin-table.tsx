import DeletionConfirmModal from '@/components/ui/deletion-confirm-modal';
import NoTableData from '@/components/ui/no-data/no-table-data';
import MarginEditForm from './margin-edit-form';
import MarginRow from './margin-row';
import { MarginLevel } from '@/types/entity';
import { useMargins } from '../hooks/use-margins';

interface IMarginListProps {
  margins: Partial<MarginLevel>[];
}

const MarginsTable = ({ margins }: IMarginListProps) => {
  const {
    updateInitialValues,
    setUpdateInitialValues,
    showDeleteItemModal,
    handleDeleteItemModalClose,
    handleDeleteItemModalShow,
    showEditSupplierModal,
    handleEditMarginModalClose,
    handleEditMarginModalShow,
    setMarginId,
    isLoading,
    handleDeletion,
  } = useMargins();

  return (
    <>
      <div className="card-body">
        <table
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
                  key={margin.id ?? index}
                  setMarginId={setMarginId}
                  handleDeleteItemModalShow={handleDeleteItemModalShow}
                  handleEditMarginModalShow={handleEditMarginModalShow}
                  setUpdateInitialValues={setUpdateInitialValues}
                />
              ))
            ) : (
              <NoTableData number={3} />
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
