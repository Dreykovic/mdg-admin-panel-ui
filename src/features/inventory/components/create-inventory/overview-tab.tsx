import { formatCurrency } from '@/utils/format';

import { CreateInventoryPayload } from '../../types';

const OverviewTab = ({ values }: { values: CreateInventoryPayload }) => {
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
                        className={`badge ${values.inventoryMetaData?.quantity > 0 ? 'bg-success' : 'bg-danger'}`}
                      >
                        {values.inventoryMetaData?.quantity || 0}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Available Quantity:</span>
                      <span
                        className={`badge ${
                          (values.inventoryMetaData?.availableQuantity ||
                            values.inventoryMetaData?.quantity ||
                            0) > 0
                            ? 'bg-success'
                            : 'bg-danger'
                        }`}
                      >
                        {values.inventoryMetaData?.availableQuantity ||
                          values.inventoryMetaData?.quantity ||
                          0}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Safety Stock Level:</span>
                      <span className="badge bg-info">
                        {values.inventoryMetaData?.safetyStockLevel || 0}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Reorder Threshold:</span>
                      <span className="badge bg-primary">
                        {values.inventoryMetaData?.reorderThreshold || 0}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Lead Time:</span>
                      <span className="badge bg-secondary">
                        {values.inventoryMetaData?.leadTimeInDays || 0} days
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Unit Cost:</span>
                      <span className="badge bg-dark">
                        {values.inventoryMetaData?.unitCost
                          ? formatCurrency(values.inventoryMetaData.unitCost)
                          : 'Not set'}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Total Value:</span>
                      <span className="badge bg-dark">
                        {values.inventoryMetaData?.unitCost &&
                        values.inventoryMetaData?.quantity
                          ? formatCurrency(
                              values.inventoryMetaData.unitCost *
                                values.inventoryMetaData.quantity,
                            )
                          : 'Not available'}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Valuation Method:</span>
                      <span className="text-primary">
                        {values.inventoryMetaData?.valuationMethod || 'FIFO'}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Status:</span>
                      <span>
                        {values.inventoryMetaData?.inStock === 'true' ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out of Stock</span>
                        )}
                      </span>
                    </li>
                    <li className="list-group-item bg-transparent d-flex justify-content-between px-0">
                      <span className="fw-semibold">Back Orderable:</span>
                      <span>
                        {values.inventoryMetaData?.backOrderable === 'true' ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-danger">No</span>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Alerts section */}
              <div className="mt-4">
                {values.inventoryMetaData?.quantity === 0 && (
                  <div className="alert alert-danger mb-2">
                    <strong>Warning:</strong> You are creating an inventory with
                    zero quantity.
                  </div>
                )}

                {values.inventoryMetaData?.availableQuantity <
                  values.inventoryMetaData?.reorderThreshold && (
                  <div className="alert alert-warning mb-2">
                    <strong>Notice:</strong> Available quantity is below reorder
                    threshold.
                    {values.inventoryMetaData?.leadTimeInDays > 0 && (
                      <div className="mt-1">
                        Estimated lead time:{' '}
                        <strong>
                          {values.inventoryMetaData.leadTimeInDays} days
                        </strong>
                      </div>
                    )}
                  </div>
                )}

                {values.inventoryMetaData?.quantity > 0 &&
                  values.inventoryMetaData?.unitCost > 0 && (
                    <div className="alert alert-success mb-2">
                      <strong>Ready:</strong> Initial stock of{' '}
                      {values.inventoryMetaData.quantity} units worth{' '}
                      {formatCurrency(
                        values.inventoryMetaData.unitCost *
                          values.inventoryMetaData.quantity,
                      )}
                      will be recorded.
                    </div>
                  )}

                {(!values.warehouseId || values.warehouseId === '') && (
                  <div className="alert alert-secondary mb-2">
                    <strong>Required:</strong> Please select a warehouse.
                  </div>
                )}

                {values.inventoryMetaData?.backOrderable === 'true' &&
                  values.inventoryMetaData?.inStock === 'false' && (
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
