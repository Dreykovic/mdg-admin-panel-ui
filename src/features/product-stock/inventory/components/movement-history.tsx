import React from 'react';

import {
  MovementType,
  ReferenceType,
  Inventory,
  StockMovement,
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
      case 'STOCK_IN':
        return 'icofont-arrow-up text-success';
      case 'STOCK_OUT':
        return 'icofont-arrow-down text-danger';
      default:
        return 'icofont-question text-secondary';
    }
  };

  const getTypeBadge = (type: MovementType): string => {
    switch (type) {
      case 'STOCK_IN':
        return 'badge bg-success';
      case 'STOCK_OUT':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getReferenceTypeBadge = (refType: ReferenceType): string => {
    switch (refType) {
      case 'ORDER':
        return 'badge bg-info';
      case 'PURCHASE_ORDER':
        return 'badge bg-primary';
      case 'ADJUSTMENT':
        return 'badge bg-warning text-dark';
      case 'DAMAGE':
        return 'badge bg-danger';
      case 'RETURN':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light text-dark';
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
          <button className="btn btn-sm btn-outline-primary me-2">
            <i className="icofont-filter me-1"></i>Filter
          </button>
          <button className="btn btn-sm btn-outline-secondary">
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
                  <span className={getTypeBadge(movement.type)}>
                    <i className={`${getTypeIcon(movement.type)} me-1`}></i>
                    {movement.type === 'STOCK_IN' ? 'Input' : 'Output'}
                  </span>
                </td>
                <td className="fw-bold">{movement.quantity}</td>
                <td>
                  <span
                    className={getReferenceTypeBadge(movement.referenceType)}
                  >
                    {movement.referenceType}
                  </span>
                </td>
                <td>{movement.notes}</td>
                <td>
                  <button className="btn btn-sm btn-outline-info me-1">
                    <i className="icofont-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
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
