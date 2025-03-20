import React from 'react';

import {
  MovementType,
  Inventory,
  StockMovement,
  MovementReason,
} from '@/types/entity';

interface MovementHistoryProps {
  inventory: Inventory;
}

// Movement History
const MovementHistory: React.FC<MovementHistoryProps> = ({ inventory }) => {
  // Sample movements
  const movements: StockMovement[] = inventory.stockMovements ?? [];
  const getTypeIcon = (type: MovementType): string => {
    switch (type) {
      case 'INCOMING':
        return 'icofont-arrow-up ';

      case 'OUTGOING':
        return 'icofont-arrow-down ';

      case 'TRANSFER':
        return 'icofont-exchange ';

      case 'ADJUSTMENT':
        return 'icofont-adjust ';

      case 'RETURN':
        return 'icofont-reply ';

      default:
        return 'icofont-question text-muted';
    }
  };

  const getTypeBadge = (type: MovementType): string => {
    switch (type) {
      case 'INCOMING':
        return 'badge bg-success';

      case 'OUTGOING':
        return 'badge bg-danger';

      case 'TRANSFER':
        return 'badge bg-info';

      case 'ADJUSTMENT':
        return 'badge bg-warning text-dark';

      case 'RETURN':
        return 'badge bg-secondary';

      default:
        return 'badge bg-light text-dark';
    }
  };

  const getReferenceTypeBadge = (refType: MovementReason): string => {
    switch (refType) {
      case 'PURCHASE':
      case 'PURCHASE_ORDER':
        return 'badge bg-primary';

      case 'SALE':
      case 'ORDER':
        return 'badge bg-info';

      case 'TRANSFER':
        return 'badge bg-secondary';

      case 'ADJUSTMENT_INVENTORY':
      case 'ADJUSTMENT_DAMAGE':
      case 'ADJUSTMENT_EXPIRY':
        return 'badge bg-warning text-dark';

      case 'RETURN_FROM_CUSTOMER':
      case 'RETURN_TO_SUPPLIER':
        return 'badge bg-success';

      case 'PRODUCTION':
      case 'CONSUMPTION':
        return 'badge bg-dark';

      case 'INVENTORY':
        return 'badge bg-light text-dark';

      case 'OTHER':
      default:
        return 'badge bg-secondary text-light';
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Movement History</h5>
        <div>
          <button className="btn btn-sm btn-outline-primary me-2" disabled>
            <i className="icofont-filter me-1"></i>Filter
          </button>
          <button className="btn btn-sm btn-outline-secondary" disabled>
            <i className="icofont-download me-1"></i>Export
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Reference</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{formatDate(movement.createdAt)}</td>

                <td>
                  <span className={getTypeBadge(movement.movementType)}>
                    <i
                      className={`${getTypeIcon(movement.movementType)} me-1`}
                    ></i>
                    {movement.movementType === 'INCOMING' ? 'Input' : 'Output'}
                  </span>
                </td>

                <td className="fw-bold">{movement.quantity}</td>

                <td>
                  <span className={getReferenceTypeBadge(movement.reason)}>
                    {movement.reason}
                  </span>
                </td>

                <td>{movement.notes || 'N/A'}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-info me-1"
                    title="View"
                    disabled
                  >
                    <i className="icofont-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Print"
                    disabled
                  >
                    <i className="icofont-print"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1}>
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default MovementHistory;
