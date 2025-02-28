import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ErrorAlert from '@/components/ui/error-alert';
import CardLoading from '@/components/ui/loading/card-loading';
import { AppDispatch } from '@/store';
import { useGetUniqueProductQuery } from '@/store/api-slice';
import { setPageName } from '@/store/page-slice';
import { Product } from '@/types/entity';

import ProductOverviewTabPane from './overview';
import ProductStockTabPane from './stock';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setPageName({ name: 'product-details', group: 'products' }));
  }, [dispatch]);
  const {
    data: response,
    isFetching,
    isError,
    error,
  } = useGetUniqueProductQuery(
    { productId: productId as string },
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

  const product = response?.content.product;
  console.log('Fetched Product', product);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Product Details</h3>
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <ul
                className="nav nav-tabs tab-body-header rounded ms-3 prtab-set w-sm-100"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#list-view"
                    role="tab"
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#grid-view"
                    role="tab"
                  >
                    Stock
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <ProductOverviewTabPane product={product as Product} />
        <ProductStockTabPane />
      </div>
    </>
  );
};

export default ProductDetailsPage;
