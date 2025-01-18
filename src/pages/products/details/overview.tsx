import ProductConversionCard from '@/features/product-details/components/conversion';
import ProductMetadata from '@/features/product-details/components/metadata';
import ProductOrganizeCard from '@/features/product-details/components/organize';
import ProductPriceSettings from '@/features/product-details/components/price-settings';
import ProductStateCard from '@/features/product-details/components/state';

type Props = {};

const ProductOverviewTabPane = (props: Props) => {
  return (
    <>
      <div className="tab-pane fade show active" id="list-view">
        <div className="row g-3 mb-3 row-deck">
          <div className="col-md-12 col-lg-8 col-xl-7 col-xxl-7">
            <ProductMetadata />
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 col-xxl-5">
            <ProductPriceSettings />
          </div>
        </div>
        <div className="row g-3 mb-3 mt-3 row-deck">
          <div className="col-lg-4">
            <ProductOrganizeCard />
          </div>
          <div className="col-lg-4">
            <ProductConversionCard />
          </div>
          <div className="col-lg-4">
            <ProductStateCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverviewTabPane;
