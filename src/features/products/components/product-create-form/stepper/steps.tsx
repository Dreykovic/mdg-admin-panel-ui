// Définition des étapes
import { FormikValues } from 'formik';
import { JSX } from 'react';
import * as Yup from 'yup';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import {
  step1InitialValues,
  step1Schema,
  step2InitialValues,
  step2Schema,
  step3InitialValues,
  step3Schema,
} from './validation';

// Définition du type des étapes
export interface Step {
  initialValues: FormikValues;
  title: string;
  content: JSX.Element;
  validationSchema: Yup.Schema;
}
const steps: Step[] = [
  {
    initialValues: step1InitialValues,
    title: 'Product Informations',
    content: (
      <>
        <Step1 />
      </>
    ),
    validationSchema: step1Schema,
  },
  {
    initialValues: step2InitialValues,
    title: 'Pricing',
    content: (
      <>
        <Step2 />
      </>
    ),
    validationSchema: step2Schema,
  },
  {
    initialValues: step3InitialValues,
    title: 'Organize',
    content: (
      <>
        <Step3 />
      </>
    ),
    validationSchema: step3Schema,
  },
];
export default steps;
