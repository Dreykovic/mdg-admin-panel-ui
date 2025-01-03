import { ErrorMessage, Field } from 'formik'; // Assurez-vous d'importer useFormikContext

import {
  useGetCategoriesListQuery,
  useGetOriginsListQuery,
  useGetSuppliersListQuery,
} from '@/store/api-slice';
import { useState } from 'react';
import SupplierCreateForm from '@/features/suppliers/components/supplier-create-form';
import CategoryCreateForm from '@/features/categories/components/category-create-form';

const Step3 = () => {
  const [showCreateSupplierModal, setShowCreateSupplierModal] = useState(false);

  const handleCreateSupplierModalClose = () =>
    setShowCreateSupplierModal(false);
  const handleCreateSupplierModalShow = () => setShowCreateSupplierModal(true);

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const handleCreateCategoryModalClose = () =>
    setShowCreateCategoryModal(false);
  const handleCreateCategoryModalShow = () => setShowCreateCategoryModal(true);

  // Récupération des suppliers
  const { data: suppliersResponse, isFetching: isSuppliersFetching } =
    useGetSuppliersListQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const suppliers = suppliersResponse?.content.suppliers;

  // Récupération des categories
  const { data: categoriesResponse, isFetching: isCategoriesFetching } =
    useGetCategoriesListQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const categories = categoriesResponse?.content.categories;

  // Récupération des origins
  const { data: originsResponse, isFetching: isOriginsFetching } =
    useGetOriginsListQuery(undefined, {
      refetchOnMountOrArgChange: true,
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
          <span
            role="button"
            className="btn btn-light"
            onClick={handleCreateSupplierModalShow}
          >
            <i className="icofont-plus  fs-4"></i>
          </span>
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
            <span
              role="button"
              className="btn btn-light"
              onClick={handleCreateCategoryModalShow}
            >
              <i className="icofont-plus  fs-4"></i>
            </span>
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
            <span role="button" className="btn btn-light">
              <i className="icofont-plus  fs-4"></i>
            </span>
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
    </>
  );
};

export default Step3;
