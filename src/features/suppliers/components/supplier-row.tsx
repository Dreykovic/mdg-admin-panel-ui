import { useCallback } from 'react';

import { Supplier } from '@/types/entity';

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
    [setSupplierId, handleDeleteItemModalShow, supplier],
  );
  const triggerSupplierUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Empêche la propagation du clic vers le <tr>

      const values: Partial<Supplier> = supplier;
      setUpdateInitialValues(values);
      handleEditSupplierModalShow();
    },
    [setUpdateInitialValues, handleEditSupplierModalShow, supplier],
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
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
          >
            <i className="icofont-edit text-primary"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary deleterow"
            onClick={triggerDeletion}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete"
          >
            <i className="icofont-ui-delete text-primary"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SupplierRow;
