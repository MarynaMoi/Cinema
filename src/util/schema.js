import * as Yup from 'yup';

export const schema = Yup.object({
  fullname: Yup.string().required('Name is required'),
  title: Yup.string().required('Title is required'),
});
