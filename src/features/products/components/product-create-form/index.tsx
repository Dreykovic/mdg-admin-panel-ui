import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/loading-button';
import { AppDispatch } from '@/store';

import Stepper from './stepper';
import steps from './stepper/steps';
import { productInitialValues } from './stepper/validation';
import { Product } from '@/types/entity';
import { useCreateProductMutation } from '../../store/api';
import { ApiResponse } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { authRoutes } from '@/routes';

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
    if (stepIndex < steps.length - 1) {
      setFormData((prev) => ({ ...prev, ...values }));

      setStepIndex(stepIndex + 1);
    } else {
      await handleSubmit();
    }
    setSubmitting(false);
  };

  const handlePrevious = () => {
    setStepIndex(stepIndex - 1);
  };
  const [createProduct] = useCreateProductMutation();
  const handleSubmit = async () => {
    try {
      if (formData) {
        const response: ApiResponse<Product> =
          await createProduct(formData).unwrap();
        console.log('response: ', response);

        if (response.success) {
          dispatch(
            showAlert({
              title: 'Succuss !',
              message: `${response.message}`,
            }),
          );
          navigate(authRoutes.products.path);
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
            (error as any).data.message,
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
