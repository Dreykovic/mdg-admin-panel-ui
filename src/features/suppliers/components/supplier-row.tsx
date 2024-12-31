import { Supplier } from '@/types/entity';

interface ISupplierRowProps {
  supplier: Partial<Supplier>;
}
const SupplierRow = ({ supplier }: ISupplierRowProps) => {
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
            data-bs-toggle="modal"
            data-bs-target="#editholiday"
          >
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SupplierRow;
