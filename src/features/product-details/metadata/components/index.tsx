import { useState } from 'react';

import { Product } from '@/types/entity';

import ProductMetadataEditForm from './edit';
import ProductTagsSection from './product-tags-section';

type Props = {
  product: Product;
};

const ProductMetadata = ({ product }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const handleTagsUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <section
        className="card shadow rounded-3 border-0 overflow-hidden"
        aria-labelledby="product-metadata-title"
      >
        <div className="card-body p-0">
          <div className="row g-0">
            {/* Product Image/Icon Column */}
            <div className="col-md-4 bg-light d-flex align-items-center justify-content-center p-4">
              <div className="text-center">
                <i
                  className="icofont-honey fs-1 text-primary mb-3"
                  aria-hidden="true"
                ></i>
                <h2
                  id="product-metadata-title"
                  className="h6 d-md-none fw-bold mt-2"
                >
                  {product.name}
                </h2>
              </div>
            </div>

            {/* Product Information Column */}
            <div className="col-md-8">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2
                    id="product-metadata-title-desktop"
                    className="h5 fw-bold d-none d-md-block"
                  >
                    {product.name}
                  </h2>
                  <button
                    onClick={toggleEditModal}
                    className="btn btn-sm btn-outline-primary rounded-pill"
                    aria-label={`Modifier les informations de ${product.name}`}
                  >
                    <i className="icofont-edit me-1" aria-hidden="true"></i>
                    <span>Modifier</span>
                  </button>
                </div>

                <div className="mb-4">
                  {product.description ? (
                    <p className="text-secondary mb-0">{product.description}</p>
                  ) : (
                    <p className="text-muted fst-italic mb-0">
                      Aucune description disponible
                    </p>
                  )}
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
      </section>

      {/* Edit Modal */}
      <ProductMetadataEditForm
        show={isEditModalOpen}
        handleClose={toggleEditModal}
        product={product}
        onSave={handleTagsUpdated}
      />
    </>
  );
};

export default ProductMetadata;
