import { Product } from '@/types/entity';
import { useState } from 'react';
import ProductPriceSettingsEditForm from './edit';

type Props = {
  product: Product;
};

const ProductPriceSettings = ({ product }: Props) => {
  const [
    showUpdateProductPriceSettingsModal,
    setShowUpdateProductPriceSettingsModal,
  ] = useState(false);

  const handleUpdateProductPriceSettingsModalClose = () =>
    setShowUpdateProductPriceSettingsModal(false);
  const handleUpdateProductPriceSettingsModalShow = () =>
    setShowUpdateProductPriceSettingsModal(true);
  return (
    <>
      <div className="card shadow">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="mb-0 fw-bold ">Price Settings</h6>
          <button
            type="button"
            className="btn p-0"
            onClick={handleUpdateProductPriceSettingsModalShow}
          >
            <i className="icofont-edit text-primary fs-6"></i>
          </button>
        </div>
        <div className="card-body mem-list">
          <div className="row g-4 row-deck ">
            <div className="col-md-6 col-sm-6">
              <div className="card">
                <div className="card-body ">
                  <i className="icofont-checked fs-3"></i>
                  <h6 className="mt-3 mb-0 small-14">Cost (Whole) </h6>
                  <span className="fw-bold">${product.costPerGramWhole}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card">
                <div className="card-body ">
                  <i className="icofont-stopwatch fs-3"></i>
                  <h6 className="mt-3 mb-0 small-14"> Cost (Ground)</h6>
                  <span className="fw-bold">${product.costPerGramGround}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card">
                <div className="card-body ">
                  <i className="icofont-ban fs-3"></i>
                  <h6 className="mt-3 mb-0  small-14">Price (Whole)</h6>
                  <span className="fw-bold">${product.pricePerGramWhole}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card">
                <div className="card-body ">
                  <i className="icofont-beach-bed fs-3"></i>
                  <h6 className="mt-3 mb-0  small-14">Price (Ground)</h6>
                  <span className="fw-bold">${product.pricePerGramGround}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card">
                <div className="card-body ">
                  <i className="icofont-beach-bed fs-3"></i>
                  <h6 className="mt-3 mb-0  small-14">Additional Cost</h6>
                  <span className="fw-bold">${product.additionalCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductPriceSettingsEditForm
        show={showUpdateProductPriceSettingsModal}
        handleClose={handleUpdateProductPriceSettingsModalClose}
        product={product}
      />
    </>
  );
};

export default ProductPriceSettings;
