import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductPriceSettingsEditForm from './edit';
import ProductPriceMargin from './margin';

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

  // Format currency display
  const formatCurrency = (value: number | null) => {
    if (value === null) return '$0.00';
    return `$${value.toFixed(2)}`;
  };

  // Calculate profit margins
  const wholeProfitMargin =
    product.pricePerGramWhole - product.costPerGramWhole;
  const groundProfitMargin =
    product.pricePerGramGround - product.costPerGramGround;

  return (
    <>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            <i className="icofont-price fs-5 me-2"></i>
            Price Settings
          </h5>
          <button
            className="btn btn-sm btn-light"
            onClick={handleUpdateProductPriceSettingsModalShow}
          >
            <i className="icofont-edit me-1"></i>
            Edit Pricing
          </button>
        </div>

        <div className="card-body py-4">
          <div className="row mb-4">
            <div className="col-12">
              <ProductPriceMargin product={product} />
            </div>
          </div>

          <div className="row g-4">
            {/* Left column - Cost section */}
            <div className="col-md-6">
              <h6 className="text-muted mb-3 border-bottom pb-2">
                <i className="icofont-money-bag me-2"></i>
                Cost Information
              </h6>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="d-block fw-bold">Whole</span>
                  <small className="text-muted">Cost per gram</small>
                </div>
                <span className="badge bg-light text-dark fs-6 px-3 py-2">
                  {formatCurrency(product.costPerGramWhole)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="d-block fw-bold">Ground</span>
                  <small className="text-muted">Cost per gram</small>
                </div>
                <span className="badge bg-light text-dark fs-6 px-3 py-2">
                  {formatCurrency(product.costPerGramGround)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="d-block fw-bold">Additional</span>
                  <small className="text-muted">Extra processing cost</small>
                </div>
                <span className="badge bg-light text-dark fs-6 px-3 py-2">
                  {formatCurrency(product.additionalCost)}
                </span>
              </div>
            </div>

            {/* Right column - Price section */}
            <div className="col-md-6">
              <h6 className="text-muted mb-3 border-bottom pb-2">
                <i className="icofont-coins me-2"></i>
                Price & Profit Information
              </h6>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="d-block fw-bold">Whole</span>
                  <small className="text-muted">Sale price per gram</small>
                </div>
                <div className="text-end">
                  <span className="badge bg-primary text-white fs-6 px-3 py-2">
                    {formatCurrency(product.pricePerGramWhole)}
                  </span>
                  <small className="d-block mt-1 text-success">
                    Profit: {formatCurrency(wholeProfitMargin)}
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="d-block fw-bold">Ground</span>
                  <small className="text-muted">Sale price per gram</small>
                </div>
                <div className="text-end">
                  <span className="badge bg-primary text-white fs-6 px-3 py-2">
                    {formatCurrency(product.pricePerGramGround)}
                  </span>
                  <small className="d-block mt-1 text-success">
                    Profit: {formatCurrency(groundProfitMargin)}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-light">
          <div className="alert alert-info mb-0">
            <small>
              <i className="icofont-info-circle me-2"></i>
              Pricing is calculated based on the selected margin level and
              product costs. Edit pricing to override the automatic
              calculations.
            </small>
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
