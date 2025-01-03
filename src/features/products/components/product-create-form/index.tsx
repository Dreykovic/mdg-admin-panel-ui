import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/loading-button';
import { AppDispatch } from '@/store';

import Stepper from './stepper';
import steps from './stepper/steps';
import { productInitialValues } from './stepper/validation';

const AddProduct = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const [formData, setFormData] = useState({});

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
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const handlePrevious = () => {
    setStepIndex(stepIndex - 1);
  };
  const handleSubmit = async () => {
    try {
      console.log(formData);
    } catch (error) {
      console.error(error);

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
