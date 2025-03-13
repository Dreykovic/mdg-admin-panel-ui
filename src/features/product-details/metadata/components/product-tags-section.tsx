// File: ProductTagsSection.tsx
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import ErrorAlert from '@/components/ui/error-alert';
import { useGetUniqueProductTagLinksQuery } from '@/store/api/product-tag';
import { Product, ProductTag } from '@/types/entity';

import ProductTagsModal from './product-tags-modal';
import TagBadge from './tag-badge';

type ProductTagsSectionProps = {
  product: Product;
  onTagsUpdated?: () => void;
};

const ProductTagsSection = ({
  product,
  onTagsUpdated,
}: ProductTagsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: response,
    isFetching,
    isError,
    error,
  } = useGetUniqueProductTagLinksQuery(
    { productId: product.id as string },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    },
  );

  if (isFetching) {
    return <Spinner animation="border" />;
  }

  if (isError) {
    return <ErrorAlert error={error} />;
  }

  const productTagLinks = response?.content.productTagLinks;

  // Get current product tags
  const currentTags = productTagLinks?.map((link) => link.productTag) || [];

  return (
    <div className="mt-3 pt-3 border-top">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-bold fs-6">Tags</h6>
        <button
          className="btn btn-sm btn-outline-primary rounded-pill"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="icofont-edit me-1"></i>
          Gérer les tags
        </button>
      </div>

      <div className="d-flex flex-wrap gap-2">
        {isFetching ? (
          <Spinner animation="border" />
        ) : isError ? (
          <ErrorAlert error={error} />
        ) : currentTags.length > 0 ? (
          currentTags.map((tag, index) => (
            <TagBadge key={index} tag={tag as ProductTag} />
          ))
        ) : (
          <span className="text-muted fst-italic">Aucun tag assigné</span>
        )}
      </div>

      {/* Modal with advanced tag management */}
      <ProductTagsModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        product={product}
        productTagLinks={productTagLinks}
        onTagsUpdated={onTagsUpdated}
      />
    </div>
  );
};

export default ProductTagsSection;
