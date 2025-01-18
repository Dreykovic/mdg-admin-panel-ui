import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import ProductOverviewTabPane from './overview';
import ProductStockTabPane from './stock';

const ProductDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'product-details', group: 'products' }));
  }, [dispatch]);
  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">Contact</h3>
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
                    List View
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#grid-view"
                    role="tab"
                  >
                    Grid View
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <ProductOverviewTabPane />
        <ProductStockTabPane />
      </div>
    </>
  );
};

export default ProductDetailsPage;
