import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';
import AddProduct from '@/features/products/components/product-create-form';

const AddProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-product', group: 'products' }));
  }, [dispatch]);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">New product</h3>{' '}
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button type="button" className="btn btn-dark w-sm-100">
                <i className="icofont-plus-circle me-2 fs-6"></i>Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center g-3">
        <div className="col-lg-8 col-md-12">
          <AddProduct />
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
