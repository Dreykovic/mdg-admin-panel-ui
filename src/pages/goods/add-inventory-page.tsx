import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import InventoryCreateForm from '@/features/inventory/components/create-inventory';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

const InventoryCreatePage = () => {
  const { sku } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-inventory', group: 'goods' }));
  }, [dispatch]);

  return (
    <div className="row justify-content-center g-3">
      <div className="col-lg-10 col-md-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h2 className="mb-0">
              Add Inventory for Product SKU: <Badge bg="info">{sku}</Badge>
            </h2>
          </div>
        </div>
        <InventoryCreateForm sku={sku as string} />
      </div>
    </div>
  );
};

export default InventoryCreatePage;
