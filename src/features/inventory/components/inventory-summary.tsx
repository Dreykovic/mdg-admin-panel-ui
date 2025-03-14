import { Inventory } from '@/types/entity';
import { formatDateTime, formatCurrency } from '@/utils/format';

type Prop = {
  inventory: Inventory;
};

const InventorySummary = ({ inventory }: Prop) => {
  const getBadgeClass = (value: number, threshold?: number) => {
    const compareValue = threshold || inventory.reorderThreshold;
    if (value === 0) return 'badge bg-danger'; // Rouge si épuisé
    if (value < compareValue) return 'badge bg-warning text-dark'; // Jaune si faible
    return 'badge bg-success'; // Vert sinon
  };

  const getValuationMethodLabel = (method: string) => {
    switch (method) {
      case 'FIFO':
        return 'First In, First Out';
      case 'LIFO':
        return 'Last In, First Out';
      case 'WAC':
        return 'Weighted Average Cost';
      case 'FEFO':
        return 'First Expired, First Out';
      default:
        return method;
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card shadow border-3">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📦 Inventory Information</h5>
            <span className="badge bg-light text-primary">
              ID: {inventory.id.substring(0, 8)}...
            </span>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Colonne Quantités */}
              <div className="col-md-4">
                <h6 className="border-bottom pb-2 mb-3">Stock Quantities</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Current Quantity</span>
                    <span className={getBadgeClass(inventory.quantity)}>
                      {inventory.quantity}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Available</span>
                    <span
                      className={getBadgeClass(inventory.availableQuantity)}
                    >
                      {inventory.availableQuantity}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Reserved</span>
                    <span className="badge bg-secondary">
                      {inventory.reservedQuantity}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Minimum Quantity</span>
                    <span className="badge bg-info">
                      {inventory.minimumQuantity || 0}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Safety Stock</span>
                    <span className="badge bg-info">
                      {inventory.safetyStockLevel || 0}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Colonne Coûts et Paramètres */}
              <div className="col-md-4">
                <h6 className="border-bottom pb-2 mb-3">Costs & Parameters</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Unit Cost</span>
                    <span className="badge bg-secondary">
                      {inventory.unitCost
                        ? formatCurrency(inventory.unitCost)
                        : 'N/A'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Total Value</span>
                    <span className="badge bg-dark">
                      {inventory.totalValue
                        ? formatCurrency(inventory.totalValue)
                        : 'N/A'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Valuation Method</span>
                    <span className="text-muted">
                      {inventory.valuationMethod
                        ? getValuationMethodLabel(inventory.valuationMethod)
                        : 'FIFO'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Reorder Threshold</span>
                    <span className="badge bg-info">
                      {inventory.reorderThreshold}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Reorder Quantity</span>
                    <span className="badge bg-primary">
                      {inventory.reorderQuantity}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Colonne Informations Supplémentaires */}
              <div className="col-md-4">
                <h6 className="border-bottom pb-2 mb-3">
                  Additional Information
                </h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">In Stock</span>
                    <span>{inventory.inStock ? '✅ Yes' : '❌ No'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Back Orderable</span>
                    <span>{inventory.backOrderable ? '✅ Yes' : '❌ No'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Lead Time</span>
                    <span>
                      {inventory.leadTimeInDays
                        ? `${inventory.leadTimeInDays} days`
                        : 'Not specified'}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">Last Stock Check</span>
                    <span className="text-muted">
                      {formatDateTime(inventory.lastStockCheck)}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <div>
                      <span className="fw-bold">Warehouse</span>
                      <p className="text-muted small mb-0">
                        {inventory.warehouseId
                          ? `${inventory.warehouse?.name} 🗺️ ${inventory.warehouse?.location || 'No location'}`
                          : 'N/A'}
                      </p>
                      {inventory.stockLocation && (
                        <p className="text-muted small mb-0">
                          <span className="fw-bold">Location: </span>
                          {inventory.stockLocation}
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Notes ou informations supplémentaires */}
            {inventory.notes && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-info mb-0">
                    <strong>Notes:</strong> {inventory.notes}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
