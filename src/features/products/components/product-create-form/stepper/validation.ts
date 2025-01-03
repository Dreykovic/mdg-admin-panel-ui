import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .typeError('Name must be a string'),
  isGlutenFree: yup
    .boolean()
    .required('Gluten-free status is required')
    .typeError('Gluten-free status must be a boolean'),
  isGMOFree: yup
    .boolean()
    .required('GMO-free status is required')
    .typeError('GMO-free status must be a boolean'),
  description: yup
    .string()
    .nullable()
    .typeError('Description must be a string'),

  isActive: yup
    .boolean()
    .required('Active status is required')
    .typeError('Active status must be a boolean'),
  minimumStockLevel: yup
    .number()
    .integer()
    .positive()
    .required('Minimum stock level is required')
    .typeError('Minimum stock level must be a positive integer'),
  quantity: yup
    .number()
    .integer()
    .positive()
    .required('Quantity is required')
    .typeError('Quantity must be a positive integer'),
  additionalCost: yup
    .number()
    .positive()
    .nullable()
    .typeError('Additional cost must be a positive number'),
  costPerGramWhole: yup
    .number()
    .positive()
    .required('Cost per gram (whole) is required')
    .typeError('Cost per gram (whole) must be a positive number'),
  costPerGramGround: yup
    .number()
    .positive()
    .required('Cost per gram (ground) is required')
    .typeError('Cost per gram (ground) must be a positive number'),
  pricePerGramWhole: yup
    .number()
    .positive()
    .required('Price per gram (whole) is required')
    .typeError('Price per gram (whole) must be a positive number'),
  pricePerGramGround: yup
    .number()
    .positive()
    .required('Price per gram (ground) is required')
    .typeError('Price per gram (ground) must be a positive number'),
  originId: yup
    .number()
    .integer()
    .positive()
    .required('Origin ID is required')
    .typeError('Origin ID must be a positive integer'),
  subcategoryId: yup
    .number()
    .integer()
    .positive()
    .nullable()
    .typeError('Subcategory ID must be a positive integer'),
  categoryId: yup
    .number()
    .integer()
    .positive()
    .required('Category ID is required')
    .typeError('Category ID must be a positive integer'),
  supplierId: yup
    .number()
    .integer()
    .positive()
    .required('Supplier ID is required')
    .typeError('Supplier ID must be a positive integer'),
  marginLevelId: yup
    .number()
    .integer()
    .positive()
    .required('Margin Level ID is required')
    .typeError('Margin Level ID must be a positive integer'),
  unitOfMesureId: yup
    .number()
    .integer()
    .positive()
    .required('Unit of Measure ID is required')
    .typeError('Unit of Measure ID must be a positive integer'),
  productMedia: yup
    .array()
    .of(yup.object().typeError('Product Media must be an array of objects'))
    .required('Product Media is required')
    .typeError('Product Media must be an array'),
  stockMovements: yup
    .array()
    .of(yup.object().typeError('Stock Movements must be an array of objects'))
    .required('Stock Movements are required')
    .typeError('Stock Movements must be an array'),
  category: yup
    .object()
    .required('Category is required')
    .typeError('Category must be an object'),
});
export const productInitialValues = {
  name: '',
  isGlutenFree: false,
  isGMOFree: false,
  description: undefined,
  barcode: '',
  isActive: true,
  minimumStockLevel: 0,
  quantity: 0,
  additionalCost: undefined,
  costPerGramWhole: 0,
  costPerGramGround: 0,
  pricePerGramWhole: 0,
  pricePerGramGround: 0,
  originId: undefined,
  subcategoryId: undefined,
  categoryId: undefined,
  supplierId: undefined,
  marginLevelId: undefined,
  unitOfMesureId: undefined,
};

export const step1Schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .typeError('Name must be a string'),
  isGlutenFree: yup
    .boolean()
    .required('Gluten-free status is required')
    .typeError('Gluten-free status must be a boolean'),
  isGMOFree: yup
    .boolean()
    .required('GMO-free status is required')
    .typeError('GMO-free status must be a boolean'),
  description: yup
    .string()
    .nullable()
    .typeError('Description must be a string'),
});
export const step2Schema = yup.object({
  marginLevelId: yup
    .number()
    .integer()
    .positive()
    .required('Margin Level  is required')
    .typeError('Margin Level ID must be a positive integer'),
  additionalCost: yup
    .number()
    .positive()
    .nullable()
    .typeError('Additional cost must be a positive number'),
  costPerGramWhole: yup
    .number()
    .positive()
    .required('Cost per gram (whole) is required')
    .typeError('Cost per gram (whole) must be a positive number'),
  costPerGramGround: yup
    .number()
    .positive()
    .required('Cost per gram (ground) is required')
    .typeError('Cost per gram (ground) must be a positive number'),
});
export const step3Schema = yup.object({
  originId: yup
    .number()
    .integer()
    .positive()
    .required('Origin ID is required')
    .typeError('Origin ID must be a positive integer'),
  subcategoryId: yup
    .number()
    .integer()
    .positive()
    .nullable()
    .typeError('Subcategory ID must be a positive integer'),
  categoryId: yup
    .number()
    .integer()
    .positive()
    .required('Category ID is required')
    .typeError('Category ID must be a positive integer'),
  supplierId: yup
    .number()
    .integer()
    .positive()
    .required('Supplier ID is required')
    .typeError('Supplier ID must be a positive integer'),

  unitOfMesureId: yup
    .number()
    .integer()
    .positive()
    .required('Unit of Measure ID is required')
    .typeError('Unit of Measure ID must be a positive integer'),
});
export const stepSchema = yup.object({
  productMedia: yup
    .array()
    .of(yup.object().typeError('Product Media must be an array of objects'))
    .required('Product Media is required')
    .typeError('Product Media must be an array'),
});

export const step1InitialValues = {
  name: '',
  isGlutenFree: false,
  isGMOFree: false,
  description: undefined,
};
export const step2InitialValues = {
  additionalCost: 0,
  costPerGramWhole: 0,
  costPerGramGround: 0,
  marginLevelId: undefined,
};
export const step3InitialValues = {
  originId: undefined,
  subcategoryId: undefined,
  categoryId: undefined,
  supplierId: undefined,
  unitOfMesureId: undefined,
};
export const step4InitialValues = {
  name: '',
  isGlutenFree: false,
  isGMOFree: false,
  description: undefined,
  barcode: '',
  isActive: true,
  minimumStockLevel: 0,
  quantity: 0,
  additionalCost: undefined,
  costPerGramWhole: 0,
  costPerGramGround: 0,
  pricePerGramWhole: 0,
  pricePerGramGround: 0,
  originId: undefined,
  subcategoryId: undefined,
  categoryId: undefined,
  supplierId: undefined,
  marginLevelId: undefined,
  unitOfMesureId: undefined,
};
export default productSchema;
