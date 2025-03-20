import { Link } from 'react-router-dom';

import ErrorAlert from '@/components/ui/error-alert';
import CardLoading from '@/components/ui/loading/card-loading';
import NoCardData from '@/components/ui/no-data/no-card-data';
import InventoryManagement from '@/features/inventory/components';
import { useGetInventoryQuery } from '@/services/inventory';
import { Product } from '@/types/entity';

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

  return (
    <>
      {inventory ? (
        <div className="container-fluid">
          <InventoryManagement
            selectedProduct={product}
            sampleInventory={inventory}
          />
        </div>
      ) : (
        <>
          <NoCardData
            text={`Inventory Not Present For the product *${product.name}*`}
          />
          <div className="d-flex align-items-center justify-content-center">
            <Link
              to={`/catalog/goods/products/add-inventory/${product.sku}`}
              type="button"
              className="btn btn-dark w-sm-100"
            >
              <i className="icofont-plus-circle me-2 fs-6"></i>Add Product
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default ProductStockTabPane;
