import { Table } from 'react-bootstrap';

import { Inventory } from '@/types/entity';
import { StockMovement } from '@/types/entity';
import { formatDateTime } from '@/utils/format';

type Prop = {
  inventory: Inventory;
};

const StockMovementTable = ({ inventory }: Prop) => {
  const stockMovements: StockMovement[] = inventory.stockMovements ?? [];
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="mb-3 text-primary">📦 Stock Movements</h2>
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="bg-dark text-light">
            <tr>
              <th>#</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Reference Type</th>
              <th>Reference ID</th>
              <th>Notes</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stockMovements.map((movement, index) => (
              <tr key={movement.id}>
                <td>{index + 1}</td>
                <td
                  className={
                    movement.quantity > 0 ? 'text-success' : 'text-danger'
                  }
                >
                  {movement.quantity}
                </td>
                <td>
                  <span
                    className={`badge ${
                      movement.type === 'STOCK_IN'
                        ? 'bg-success'
                        : movement.type === 'STOCK_OUT'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                    }`}
                  >
                    {movement.type.replace('_', ' ')}
                  </span>
                </td>
                <td>{movement.referenceType ?? 'N/A'}</td>
                <td>{movement.referenceId ?? 'N/A'}</td>
                <td>{movement.notes ?? '—'}</td>
                <td>{movement.userId ? movement.user?.username : '—'}</td>
                <td>{formatDateTime(movement.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StockMovementTable;
