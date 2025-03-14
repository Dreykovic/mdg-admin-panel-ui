import { useState } from 'react';

import ProductConversionCard from '@/features/product-details/conversion/components';
import ProductMetadata from '@/features/product-details/metadata/components';
import ProductOrganizeCard from '@/features/product-details/organize';
import ProductPriceSettings from '@/features/product-details/price-settings';
import ProductStateCard from '@/features/product-details/state/components';
import { Product } from '@/types/entity';

type Props = {
  product: Product;
};

const ProductOverviewTabPane = ({ product }: Props) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div
      className="product-overview"
      role="region"
      aria-label="Vue d'ensemble du produit"
    >
      {/* Section principale avec métadonnées et prix */}
      <div className="row g-3 mb-4">
        <div className="col-lg-12">
          <section className="mb-4" aria-labelledby="product-info-heading">
            <h2 id="product-info-heading" className="h5 mb-3 visually-hidden">
              Informations du produit
            </h2>
            <ProductMetadata product={product} />
          </section>
        </div>
      </div>

      {/* Sections secondaires avec accordéon sur mobile */}
      <div className="product-details-accordion d-lg-none mb-4">
        <div className="accordion" id="productDetailsAccordion">
          <div className="accordion-item border-0 mb-3">
            <h3 className="accordion-header">
              <button
                className={`accordion-button ${expandedSection === 'organize' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('organize')}
                aria-expanded={expandedSection === 'organize'}
                aria-controls="organize-collapse"
              >
                Organisation
              </button>
            </h3>
            <div
              id="organize-collapse"
              className={`accordion-collapse collapse ${expandedSection === 'organize' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-3">
                <ProductOrganizeCard product={product} />
              </div>
            </div>
          </div>

          <div className="accordion-item border-0 mb-3">
            <h3 className="accordion-header">
              <button
                className={`accordion-button ${expandedSection === 'conversion' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('conversion')}
                aria-expanded={expandedSection === 'conversion'}
                aria-controls="conversion-collapse"
              >
                Conversion
              </button>
            </h3>
            <div
              id="conversion-collapse"
              className={`accordion-collapse collapse ${expandedSection === 'conversion' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-3">
                <ProductConversionCard product={product} />
              </div>
            </div>
          </div>

          <div className="accordion-item border-0 mb-3">
            <h3 className="accordion-header">
              <button
                className={`accordion-button danger-zone-button ${expandedSection === 'state' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('state')}
                aria-expanded={expandedSection === 'state'}
                aria-controls="state-collapse"
              >
                Zone de danger
              </button>
            </h3>
            <div
              id="state-collapse"
              className={`accordion-collapse collapse ${expandedSection === 'state' ? 'show' : ''}`}
            >
              <div className="accordion-body p-0 pt-3">
                <ProductStateCard product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disposition en grille sur desktop */}
      <div className="row g-3 d-none d-lg-flex">
        <div className="col-lg-6">
          <div className="row g-3 d-none d-lg-flex">
            <div className="col-lg-12">
              <ProductOrganizeCard product={product} />
            </div>
            <div className="col-lg-12">
              <ProductConversionCard product={product} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row g-3 d-none d-lg-flex">
            <div className="col-lg-12">
              <section
                className="mb-4"
                aria-labelledby="product-pricing-heading"
              >
                <h2
                  id="product-pricing-heading"
                  className="h5 mb-3 visually-hidden"
                >
                  Configuration des prix
                </h2>
                <ProductPriceSettings product={product} />
              </section>
            </div>
            <div className="col-lg-12">
              <ProductStateCard product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewTabPane;
