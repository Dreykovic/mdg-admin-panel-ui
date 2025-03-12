import ProductInventory from '@/features/product-stock/components/inventory';
import { Product } from '@/types/entity';
type Props = {
  product: Product;
};
const ProductStockTabPane = ({ product }: Props) => {
  return (
    <>
      <div className="tab-pane fade" id="grid-view">
        <ProductInventory />
      </div>
    </>
  );
};

export default ProductStockTabPane;
