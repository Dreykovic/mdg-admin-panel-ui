import { useState } from 'react';

import ErrorAlert from '@/components/ui/error-alert';
import CardLoading from '@/components/ui/loading/card-loading';
import NoCardData from '@/components/ui/no-data/no-card-data';
import ProductInventory from '@/features/product-stock/inventory/components';
import InventoryCreateForm from '@/features/product-stock/inventory/components/create-inventory-form';
import StockMvt from '@/features/product-stock/stock-mvt';
import { useGetInventoryQuery } from '@/store/api/inventory';
import { Inventory, Product } from '@/types/entity';
type Props = {
  product: Product;
};
const ProductStockTabPane = ({ product }: Props) => {
  const [showCreateInventoryModal, setShowCreateInventoryModal] =
    useState(false);

  const handleCreateInventoryModalClose = () =>
    setShowCreateInventoryModal(false);
  const handleCreateInventoryModalShow = () =>
    setShowCreateInventoryModal(true);
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
        {inventory ? (
          <div className="row clearfix g-3">
            <div className="col-lg-4">
              <ProductInventory inventory={inventory as Inventory} />
            </div>
            <div className="col-lg-8">
              <StockMvt />
            </div>
          </div>
        ) : (
          <>
            <NoCardData
              text={`Inventory Not Present For the product *${product.name}*`}
            />
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={handleCreateInventoryModalShow}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Create
                Inventory
              </button>
            </div>
          </>
        )}
      </div>
      <InventoryCreateForm
        show={showCreateInventoryModal}
        handleClose={handleCreateInventoryModalClose}
        sku={product.sku}
      />
    </>
  );
};

export default ProductStockTabPane;
