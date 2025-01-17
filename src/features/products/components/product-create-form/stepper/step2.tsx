/// You have to Import this line to

import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';

import MarginCreateForm from '@/features/margins/components/margin-create-form';
import { useGetMarginsListQuery } from '@/store/api-slice';
import DynamicAddBtn from '@/components/ui/buttons/dynamic-add-button';

const Step2 = () => {
  const [showCreateMarginModal, setShowCreateMarginModal] = useState(false);

  const handleCreateMarginModalClose = () => setShowCreateMarginModal(false);
  const handleCreateMarginModalShow = () => setShowCreateMarginModal(true);
  // Récupération des categories
  const { data: marginsResponse, isFetching: isMarginsFetching } =
    useGetMarginsListQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const margins = marginsResponse?.content.margins;
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-12">Cost Per Gram :</div>
        <div className="col-sm-6">
          <label htmlFor="costPerGramWhole" className="form-label required">
            Whole
          </label>

          <Field
            name="costPerGramWhole"
            type="number"
            className="form-control"
            placeholder="Cost per gram (whole)"
          />
          <ErrorMessage
            name="costPerGramWhole"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="costPerGramGround" className="form-label required">
            Ground
          </label>
          <Field
            name="costPerGramGround"
            type="number"
            className="form-control"
            placeholder="Cost per gram (ground)"
          />
          <ErrorMessage
            name="costPerGramGround"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="additionalCost" className="form-label">
            Additional cost
          </label>

          <Field
            name="additionalCost"
            type="number"
            className="form-control"
            placeholder="Additional cost"
          />
          <ErrorMessage
            name="additionalCost"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          {/* Sélection de la direction */}
          <div className="mb-3">
            <label htmlFor="marginLevelId" className="form-label required">
              Margin Level
            </label>
            <div className="d-flex w-sm-100 g-3">
              {isMarginsFetching ? (
                <div className="d-flex align-items-center">
                  <span
                    className="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Fetching Margins...
                </div>
              ) : (
                <>
                  <Field
                    as="select"
                    className="form-control"
                    name="marginLevelId"
                  >
                    <option value="">-- Select a margin level --</option>
                    {margins?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {`${option.name} (${option.margin}%)`}
                      </option>
                    ))}
                  </Field>
                </>
              )}

              <DynamicAddBtn handleClick={handleCreateMarginModalShow} />
            </div>
            <ErrorMessage
              name="marginLevelId"
              component="span"
              className="text-danger"
            />
          </div>
        </div>
      </div>
      <MarginCreateForm
        show={showCreateMarginModal}
        handleClose={handleCreateMarginModalClose}
      />
    </>
  );
};

export default Step2;
