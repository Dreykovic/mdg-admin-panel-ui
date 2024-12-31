import { Supplier } from '@/types/entity';
import SupplierRow from './supplier-row';

import NoTableData from '@/components/ui/no-data/no-table-data';
interface ISupplierListProps {
  suppliers: Partial<Supplier>[];
}
const SuppliersTable = ({ suppliers }: ISupplierListProps) => {
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
                <SupplierRow supplier={supplier} key={index++} />
              ))
            ) : (
              <>
                <NoTableData number={6} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SuppliersTable;
