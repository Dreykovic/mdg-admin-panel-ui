import { Formik, Form } from 'formik';
import { useEffect } from 'react';
import { Card, Button, Tabs, Tab } from 'react-bootstrap';
import {
  Save,
  XCircle,
  Archive,
  CurrencyDollar,
  BoxSeam,
} from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@/components/ui/buttons/loading-button';
import { useInventoryForm } from '@/features/inventory/hooks/use-inventory-form';
import { authRoutesConfig } from '@/router/config';
import { AppDispatch } from '@/store';
import { setPageName } from '@/store/slice/page-slice';

import CostTab from './cost-tab';
import LocationTab from './lovation-tab';
import OverviewTab from './overview-tab';
import QuantitiesTab from './quantities-tab';

const InventoryCreateForm = ({ sku }: { sku: string }) => {
  const navigate = useNavigate();
  const handleClose = () => navigate(authRoutesConfig.products.path);

  const { initialValues, validationSchema, handleSubmit } = useInventoryForm(
    handleClose,
    sku as string,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setPageName({ name: 'add-inventory', group: 'goods' }));
  }, [dispatch]);

  return (
    <Card className="shadow border-3">
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              <div className="row flex-row-reverse ">
                <div className="col-sm-12 col-lg-5">
                  <OverviewTab values={values} />
                </div>
                <div className=" col-sm-12 col-lg-7">
                  <Tabs defaultActiveKey="quantities" className="mb-4">
                    <Tab
                      eventKey="quantities"
                      title={
                        <span>
                          <BoxSeam className="me-2" />
                          Quantities
                        </span>
                      }
                    >
                      <QuantitiesTab />
                    </Tab>

                    <Tab
                      eventKey="cost"
                      title={
                        <span>
                          <CurrencyDollar className="me-2" />
                          Costs & Valuation
                        </span>
                      }
                    >
                      <CostTab values={values} />
                    </Tab>

                    <Tab
                      eventKey="location"
                      title={
                        <span>
                          <Archive className="me-2" />
                          Warehouse & Status
                        </span>
                      }
                    >
                      <LocationTab />
                    </Tab>
                  </Tabs>
                </div>
              </div>

              <div className="d-flex justify-content-between border-top pt-4 mt-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => resetForm()}
                  className="d-flex align-items-center"
                  type="button"
                >
                  <XCircle size={16} className="me-2" />
                  Reset Form
                </Button>

                <div>
                  <Button
                    variant="outline-dark"
                    className="me-2"
                    onClick={handleClose}
                  >
                    Skip
                  </Button>
                  <LoadingButton
                    isLoading={isSubmitting}
                    variant="primary"
                    classes="d-inline-flex align-items-center"
                    icon={<Save size={16} className="me-2" />}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default InventoryCreateForm;
