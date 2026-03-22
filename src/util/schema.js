import * as Yup from 'yup';

export const nameSchema = Yup.object({
  fullname: Yup.string()
    .required('Name is required'),
});