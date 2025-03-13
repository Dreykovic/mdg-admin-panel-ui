import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductMetadataEditForm from './edit';

type Props = {
  product: Product;
};

const ProductMetadata = ({ product }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  return (
    <>
      <div className="card shadow rounded-3 border-0 overflow-hidden">
        <div className="card-body p-0">
          <div className="row g-0">
            {/* Product Image/Icon Column */}
            <div className="col-md-4 bg-light d-flex align-items-center justify-content-center p-4">
              <div className="text-center">
                <i className="icofont-honey fs-1 text-primary mb-3"></i>
                <h6 className="d-md-none fw-bold mt-2">{product.name}</h6>
              </div>
            </div>

            {/* Product Information Column */}
            <div className="col-md-8">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold d-none d-md-block">{product.name}</h5>
                  <button
                    onClick={toggleEditModal}
                    className="btn btn-sm btn-outline-primary rounded-pill"
                    aria-label="Edit product"
                  >
                    <i className="icofont-edit me-1"></i>
                    Edit
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-secondary mb-0">{product.description}</p>
                </div>

                {/* Additional metadata could be added here */}
                <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
                  {product.productTagLinks &&
                    product.productTagLinks.map((productTagLink, index) => (
                      <span key={index} className="badge bg-light text-dark">
                        {productTagLink.productTag?.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ProductMetadataEditForm
        show={isEditModalOpen}
        handleClose={toggleEditModal}
        product={product}
      />
    </>
  );
};

export default ProductMetadata;
