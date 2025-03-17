import { InventoryMetadata } from '../../types';

const OverviewTab = ({ values }: { values: InventoryMetadata }) => {
  const {
    quantity = 0,

    availableQuantity,
    safetyStockLevel = 0,
    reorderThreshold = 0,
    leadTimeInDays = 0,

    inStock,
    backOrderable,
  } = values || {};

  const isInStock = inStock === 'true';
  const isBackOrderable = backOrderable === 'true';

  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <h5 className="mb-3 text-primary border-bottom pb-2">
            Inventory Status Overview
          </h5>

          <div className="card bg-light">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Current Quantity:</span>
                      <span
                        className={`badge ${quantity > 0 ? 'bg-success' : 'bg-danger'}`}
                      >
                        {quantity}
                      </span>
                    </li>

                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Available Quantity:</span>
                      <span
                        className={`badge ${(availableQuantity ?? quantity) > 0 ? 'bg-success' : 'bg-danger'}`}
                      >
                        {availableQuantity ?? quantity}
                      </span>
                    </li>

                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Safety Stock Level:</span>
                      <span className="badge bg-info">{safetyStockLevel}</span>
                    </li>

                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Reorder Threshold:</span>
                      <span className="badge bg-primary">
                        {reorderThreshold}
                      </span>
                    </li>

                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Lead Time:</span>
                      <span className="badge bg-secondary">
                        {leadTimeInDays} days
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Status:</span>
                      <span
                        className={isInStock ? 'text-success' : 'text-danger'}
                      >
                        {isInStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </li>

                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Back Orderable:</span>
                      <span
                        className={
                          isBackOrderable ? 'text-success' : 'text-danger'
                        }
                      >
                        {isBackOrderable ? 'Yes' : 'No'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Alerts section */}
              <div className="mt-4">
                {quantity === 0 && (
                  <div className="alert alert-danger mb-2">
                    <strong>Warning:</strong> You are creating an inventory with
                    zero quantity.
                  </div>
                )}

                {(availableQuantity ?? quantity) < reorderThreshold && (
                  <div className="alert alert-warning mb-2">
                    <strong>Notice:</strong> Available quantity is below reorder
                    threshold.
                    {leadTimeInDays > 0 && (
                      <div className="mt-1">
                        Estimated lead time:{' '}
                        <strong>{leadTimeInDays} days</strong>
                      </div>
                    )}
                  </div>
                )}

                {!isInStock && isBackOrderable && (
                  <div className="alert alert-info mb-2">
                    <strong>Note:</strong> This product will be available for
                    back orders when out of stock.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewTab;
