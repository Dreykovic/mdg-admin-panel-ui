import { Supplier } from '@/types/entity';
import { useCallback } from 'react';

interface ISupplierRowProps {
  supplier: Partial<Supplier>;
  setSupplierId: (arg: number) => void;

  setUpdateInitialValues: (arg: Partial<Supplier>) => void;
  handleDeleteItemModalShow: () => void;
  handleEditSupplierModalShow: () => void;
}

const SupplierRow = ({
  supplier,
  setSupplierId,
  setUpdateInitialValues,
  handleEditSupplierModalShow,
  handleDeleteItemModalShow,
}: ISupplierRowProps) => {
  const triggerDeletion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>
      setSupplierId(supplier?.id as number);
      handleDeleteItemModalShow();
    },
    [setSupplierId, handleDeleteItemModalShow],
  );
  const triggerSupplierUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<Supplier> = supplier;
      setUpdateInitialValues(values);
      handleEditSupplierModalShow();
    },
    [setUpdateInitialValues, handleEditSupplierModalShow],
  );
  return (
    <tr>
      <td>{supplier.name}</td>
      <td>{supplier.address1}</td>
      <td>{supplier.city}</td>
      <td>{supplier.postalCode}</td>
      <td>{supplier.country}</td>
      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={triggerSupplierUpdate}
          >
            <i className="icofont-edit text-success"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary deleterow"
            onClick={triggerDeletion}
          >
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SupplierRow;
