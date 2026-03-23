import * as Yup from 'yup';

export const schemaFullname = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
});

export const schemaTitle = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});
