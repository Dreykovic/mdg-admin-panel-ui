import ErrorAlert from '@/components/ui/error-alert';
import CardLoading from '@/components/ui/loading/card-loading';
import ProductInventory from '@/features/product-stock/components/inventory';
import { useGetInventoryQuery } from '@/store/api/inventory';
import { Inventory, Product } from '@/types/entity';
type Props = {
  product: Product;
};
const ProductStockTabPane = ({ product }: Props) => {
  const {
    data: response,
    isFetching,
    isError,
    error,
  } = useGetInventoryQuery(
    { productId: product.id as string },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    },
  );
  if (isFetching) {
    return <CardLoading number={4} />;
  }
  if (isError) {
    return <ErrorAlert error={error} />;
  }

  const inventory = response?.content.inventory;
  console.log('Fetched Inventory', inventory);

  return (
    <>
      <div className="tab-pane fade" id="product-stock">
        <ProductInventory inventory={inventory as Inventory} />
      </div>
    </>
  );
};

export default ProductStockTabPane;
