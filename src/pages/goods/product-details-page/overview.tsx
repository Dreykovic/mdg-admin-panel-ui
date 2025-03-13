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
  return (
    <>
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-12 col-lg-8 col-xl-7 col-xxl-7">
          <ProductMetadata product={product} />
        </div>
        <div className="col-md-12 col-lg-4 col-xl-5 col-xxl-5">
          <ProductPriceSettings product={product} />
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 row-deck">
        <div className="col-lg-4">
          <ProductOrganizeCard product={product} />
        </div>
        <div className="col-lg-4">
          <ProductConversionCard product={product} />
        </div>
        <div className="col-lg-4">
          <ProductStateCard product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductOverviewTabPane;
