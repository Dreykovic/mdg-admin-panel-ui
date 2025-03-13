import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductMetadataEditForm from './edit';
import ProductTagsSection from './product-tags-section';

type Props = {
  product: Product;
};

const ProductMetadata = ({ product }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Pour forcer le rafraîchissement des données

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  // Callback pour rafraîchir les données après modification des tags
  const handleTagsUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
                    aria-label="Modifier le produit"
                  >
                    <i className="icofont-edit me-1"></i>
                    Modifier
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-secondary mb-0">{product.description}</p>
                </div>

                {/* Section des tags avec rafraîchissement */}
                <ProductTagsSection
                  key={refreshKey}
                  product={product}
                  onTagsUpdated={handleTagsUpdated}
                />
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
