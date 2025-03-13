import { Icon0Circle } from 'react-bootstrap-icons';

import { Inventory } from '@/types/entity';
import { StockMovement } from '@/types/entity';

type Prop = {
  inventory: Inventory;
};
const StockMvt = ({ inventory }: Prop) => {
  const stockMovements: StockMovement[] = inventory.stockMovements ?? [];
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <table
            id="myProjectTable"
            className="table table-hover align-middle mb-0"
            style={{ width: '100%' }}
          >
            <thead>
              <tr>
                <th>Author</th>
                <th>Type</th>
                <th>Note</th>
                <th>Quantity</th>
                <th>Reference Type</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((stockMvt) => (
                <tr key={stockMvt.id}>
                  <td>
                    <span className="fw-bold ms-1">
                      {stockMvt.user?.username}
                    </span>
                  </td>
                  <td>{stockMvt.type}</td>
                  <td>{stockMvt.notes}</td>
                  <td>{stockMvt.quantity}</td>
                  <td>{stockMvt.referenceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockMvt;
