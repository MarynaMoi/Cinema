import * as Yup from 'yup';

export const schemaActor = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
});

export const schemaDirector = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
});

export const schemaStudio = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  foundationYear: Yup.number()
    .typeError('Must be number')
    .integer('Must be integer')
    .min(1800, 'Too old'),
});

export const schemaMovie = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  releaseYear: Yup.number()
    .typeError('Must be number')
    .integer('Must be integer')
    .min(1800, 'Too old'),
});
