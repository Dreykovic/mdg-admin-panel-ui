import { Inventory } from '@/types/entity';
import { formatDateTime } from '@/utils/format';

type Prop = {
  inventory: Inventory;
};

const ProductInventory = ({ inventory }: Prop) => {
  const getBadgeClass = (value: number) => {
    if (value === 0) return 'badge bg-danger'; // Rouge si épuisé
    if (value < 5) return 'badge bg-warning text-dark'; // Jaune si faible
    return 'badge bg-success'; // Vert sinon
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white py-3 d-flex justify-content-between">
        <h6 className="mb-0 fw-bold">📦 Inventory Information</h6>
        <button
          type="button"
          className="btn btn-light btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#edit1"
        >
          <i className="icofont-edit text-primary fs-6"></i> Edit
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Quantity</span>
                <span className={getBadgeClass(inventory.quantity)}>
                  {inventory.quantity}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Available Quantity</span>
                <span className={getBadgeClass(inventory.availableQuantity)}>
                  {inventory.availableQuantity}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Reserved Quantity</span>
                <span className="badge bg-secondary">
                  {inventory.reservedQuantity}
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

          {/* Right Column */}
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Back Orderable</span>
                <span>{inventory.backOrderable ? '✅ Yes' : '❌ No'}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Last Stock Check</span>
                <span className="text-muted">
                  {formatDateTime(inventory.lastStockCheck)}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Next Schedule Check</span>
                <span className="text-muted">
                  {formatDateTime(inventory.nextScheduledCheck)}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">In Stock</span>
                <span>{inventory.inStock ? '✅ Yes' : '❌ No'}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">Warehouse</span>
                  <p className="text-muted small mb-0">
                    {inventory.warehouseId
                      ? `${inventory.warehouse?.name} 🗺️(${inventory.warehouse?.location})`
                      : 'N/A'}
                  </p>
                </div>
                <button className="btn btn-sm btn-outline-primary">
                  <i className="icofont-eye"></i> View
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Full-width Restock Button */}
        <div className="row mt-3">
          <div className="col-12">
            {inventory.quantity <= inventory.reorderThreshold && (
              <button
                className="btn btn-success w-100"
                onClick={() => handleRestock(inventory.id)}
              >
                Restock <i className="icofont-refresh"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to handle restocking action
const handleRestock = (inventoryId: string) => {
  console.log(`Initiating restock for inventory with ID: ${inventoryId}`);
  // Vous pouvez ajouter un appel à l'API ou une action qui met à jour l'inventaire
};

export default ProductInventory;
