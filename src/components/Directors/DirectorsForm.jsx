import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form, } from 'formik';
//-----------------------
import {
  addDirectorItemAsync,
  updateDirectorItemAsync,
  deleteDirectorItemAsync,
} from './../../store/slices/directorsSlices';
import { createNewDirector } from '../../model/initialState';
import { renderFieldArray, renderFieldButton, renderInput } from '../helpers';
//-----------------------

export default function DirectorsForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const directors = useSelector(state => state.directorsList.directors);

  const directorItem = id
    ? directors.find(a => a.id === id) ?? createNewDirector()
    : createNewDirector();

  const onSaveDirector = (values, { resetForm }) => {
    if (!values.id) {
      const newDirector = { ...values, id: nanoid() };
      dispatch(addDirectorItemAsync(newDirector));
      resetForm();
    } else {
      dispatch(updateDirectorItemAsync(values));
      handleReturn()
    }
  };

  const handleDelete = () => {
    dispatch(deleteDirectorItemAsync(directorItem.id));
     handleReturn()
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        {renderInput('fullname', 'Full Name', values, setFieldValue)}
        {renderInput('birthday', 'Birthday', values, setFieldValue)}
        {renderInput('nationality', 'Nationality', values, setFieldValue)}
        {renderInput('image', 'image URL', values, setFieldValue)}
        {renderFieldArray('movies', 'Movies:', values)}
        {renderFieldButton(directorItem.id, handleReturn, handleDelete)}
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={directorItem}
      onSubmit={onSaveDirector}
    >
      {renderForm}
    </Formik>
  );
}
