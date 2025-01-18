import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/buttons/loading-button';

import { AppDispatch } from '@/store';
import { ApiResponse } from '@/types/api';
import { Product } from '@/types/entity';

import { useCreateProductMutation } from '../../store/api';

import Stepper from './stepper';
import steps from './stepper/steps';
import { productInitialValues } from './stepper/validation';
import { authRoutesConfig } from '@/router/config';

const AddProduct = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const [formData, setFormData] = useState<Partial<Product>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setFormData((prev) => ({ ...prev, ...values }));
    console.log('current valus', values);
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      await handleSubmit(values);
    }
    setSubmitting(false);
  };

  const handlePrevious = () => {
    setStepIndex(stepIndex - 1);
  };
  const [createProduct] = useCreateProductMutation();
  const handleSubmit = async (data: any) => {
    try {
      if (data) {
        console.log('Data to submit ', data);
        const response: ApiResponse<Product> =
          await createProduct(data).unwrap();
        console.log('response: ', response);

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Succuss !',
              message: `${response.message}`,
            }),
          );
          navigate(authRoutesConfig.products.path);
        }
      }
      console.log('form Data', formData);
    } catch (error) {
      console.error('error', error);

      dispatch(
        showAlert({
          title: 'Erreur !',
          message:
            'Une erreur est survenue lors de l’enregistrement ' +
            (error as any).data.error.message,
          success: false,
        }),
      );
    }
  };
  return (
    <>
      <div className="card mb-3 shadow">
        <Formik
          initialValues={productInitialValues} // Ajustez selon les valeurs globales de votre formulaire
          validationSchema={currentStep.validationSchema}
          onSubmit={handleNext}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <Stepper
                  step={stepIndex}
                  setStep={setStepIndex}
                  steps={steps}
                />
              </div>
              <div className="card-body">{currentStep.content}</div>
              <div className="card-footer d-flex justify-content-between">
                {stepIndex === 0 ? (
                  <span></span>
                ) : (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn btn-secondary "
                  >
                    Back
                  </button>
                )}

                <LoadingButton
                  isLoading={isSubmitting}
                  classes="btn btn-primary "
                  type="submit"
                  text={`${stepIndex < steps.length - 1 ? 'Continuer' : 'Save'}`}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProduct;
