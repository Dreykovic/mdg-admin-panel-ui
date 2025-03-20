import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AddProduct from '@/features/products/components/product-create-form';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/page-slice';

const AddProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-product', group: 'goods' }));
  }, [dispatch]);

  return (
    <>
      <div className="row align-items-center">
        <div className="border-0 mb-4">
          <div className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
            <h3 className="fw-bold py-3 mb-0">New product</h3>
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
