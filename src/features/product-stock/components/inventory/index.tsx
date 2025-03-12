import { Inventory } from '@/types/entity';
import { formatDateTime } from '@/utils/format';

type Prop = {
  inventory: Inventory;
};
const ProductInventory = ({ inventory }: Prop) => {
  return (
    <>
      <div className="row clearfix g-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header py-3 d-flex justify-content-between">
              <h6 className="mb-0 fw-bold ">Inventory Informations</h6>
              <button
                type="button"
                className="btn p-0"
                data-bs-toggle="modal"
                data-bs-target="#edit1"
              >
                <i className="icofont-edit text-primary fs-6"></i>
              </button>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Quantity</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">{inventory.quantity}</span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Available Quantity</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.availableQuantity}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Reserved Quantity</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.reservedQuantity}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Reorder Threshold</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.reorderThreshold}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Reorder Quantity</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.reorderQuantity}
                    </span>
                  </div>
                </li>

                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Back Orderable</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.backOrderable ? 'Yes' : 'No'}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Last Stock Check</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {formatDateTime(inventory.lastStockCheck)}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap mb-3">
                  <div className="col-6">
                    <span className="fw-bold">Next Schedule Check</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {formatDateTime(inventory.nextScheduledCheck)}
                    </span>
                  </div>
                </li>
                <li className="row flex-wrap">
                  <div className="col-6">
                    <span className="fw-bold">In Stock</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">
                      {inventory.inStock ? 'Yes' : 'No'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInventory;
