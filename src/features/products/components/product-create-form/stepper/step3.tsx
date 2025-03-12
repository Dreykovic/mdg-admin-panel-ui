import { ErrorMessage, Field } from 'formik'; // Assurez-vous d'importer useFormikContext
import { useState } from 'react';

import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';
import CategoryCreateForm from '@/features/categories/components/category-create-form';
import OriginCreateForm from '@/features/origins/components/origin-create-form';
import SupplierCreateForm from '@/features/suppliers/components/supplier-create-form';
import { useGetCategoriesListQuery } from '@/store/api/category';
import { useGetOriginsListQuery } from '@/store/api/origin';
import { useGetSuppliersListQuery } from '@/store/api/supplier';

const Step3 = () => {
  const [showCreateSupplierModal, setShowCreateSupplierModal] = useState(false);

  const handleCreateSupplierModalClose = () =>
    setShowCreateSupplierModal(false);
  const handleCreateSupplierModalShow = () => setShowCreateSupplierModal(true);

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const handleCreateCategoryModalClose = () =>
    setShowCreateCategoryModal(false);
  const handleCreateCategoryModalShow = () => setShowCreateCategoryModal(true);

  const [showCreateOriginModal, setShowCreateOriginModal] = useState(false);

  const handleCreateOriginModalClose = () => setShowCreateOriginModal(false);
  const handleCreateOriginModalShow = () => setShowCreateOriginModal(true);
  // Récupération des suppliers
  const { data: suppliersResponse, isFetching: isSuppliersFetching } =
    useGetSuppliersListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const suppliers = suppliersResponse?.content.suppliers;

  // Récupération des categories
  const { data: categoriesResponse, isFetching: isCategoriesFetching } =
    useGetCategoriesListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const categories = categoriesResponse?.content.categories;

  // Récupération des origins
  const { data: originsResponse, isFetching: isOriginsFetching } =
    useGetOriginsListQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  const origins = originsResponse?.content.origins;

  return (
    <>
      <div className="mb-3">
        {/* Sélection de la direction */}

        <label htmlFor="supplierId" className="form-label required">
          Supplier
        </label>
        <div className="d-flex w-sm-100 g-3">
          {isSuppliersFetching ? (
            <div className="d-flex align-items-center">
              <span
                className="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Fetching suppliers...
            </div>
          ) : (
            <>
              <Field as="select" className="form-control" name="supplierId">
                <option value="">-- Select a supplier --</option>
                {suppliers?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field>
            </>
          )}

          <DynamicAddBtn handleClick={handleCreateSupplierModalShow} />
        </div>
        <ErrorMessage
          name="supplierId"
          component="span"
          className="text-danger"
        />
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          {/* Sélection de la direction */}

          <label htmlFor="categoryId" className="form-label required">
            Categories
          </label>
          <div className="d-flex w-sm-100 g-3">
            {isCategoriesFetching ? (
              <div className="d-flex align-items-center">
                <span
                  className="spinner-grow spinner-grow-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Fetching categories...
              </div>
            ) : (
              <>
                <Field as="select" className="form-control" name="categoryId">
                  <option value="">-- Select a category --</option>
                  {categories?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Field>
              </>
            )}

            <DynamicAddBtn handleClick={handleCreateCategoryModalShow} />
          </div>
          <ErrorMessage
            name="categoryId"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          {/* Sélection de la direction */}

          <label htmlFor="originId" className="form-label required">
            Origin
          </label>
          <div className="d-flex w-sm-100 g-3">
            {isOriginsFetching ? (
              <div className="d-flex align-items-center">
                <span
                  className="spinner-grow spinner-grow-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Fetching Origins...
              </div>
            ) : (
              <>
                <Field as="select" className="form-control" name="originId">
                  <option value="">-- Select an origin --</option>
                  {origins?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.country}
                    </option>
                  ))}
                </Field>
              </>
            )}

            <DynamicAddBtn handleClick={handleCreateOriginModalShow} />
          </div>
          <ErrorMessage
            name="originId"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <SupplierCreateForm
        show={showCreateSupplierModal}
        handleClose={handleCreateSupplierModalClose}
      />
      <CategoryCreateForm
        show={showCreateCategoryModal}
        handleClose={handleCreateCategoryModalClose}
      />
      <OriginCreateForm
        show={showCreateOriginModal}
        handleClose={handleCreateOriginModalClose}
      />
    </>
  );
};

export default Step3;
