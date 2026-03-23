import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form } from 'formik';
//-----------------------
import {
  addStudioItemAsync,
  updateStudioItemAsync,
  deleteStudioItemAsync,
} from './../../store/slices/studiosSlices';
import { createNewStudio } from '../../model/initialState';
import { renderFieldArray, renderFieldButton, renderInput } from '../helpersRender';
import {schemaStudio} from '../../util/schema';
//-----------------------

export default function StudiosForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const studios = useSelector(state => state.studiosList.studios);

  const studioItem = id
    ? studios.find(a => a.id === id) ?? createNewStudio()
    : createNewStudio();

  const onSaveStudio = (values, { resetForm }) => {
    if (!values.id) {
      const newStudio = { ...values, id: nanoid() };
      dispatch(addStudioItemAsync(newStudio));
      resetForm();
    } else {
      dispatch(updateStudioItemAsync(values));
      navigate('..', { relative: 'path' });
    }
  };

  const handleDelete = () => {
    dispatch(deleteStudioItemAsync(studioItem.id));
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
    return (
      <Form>
        {renderInput('title', 'title *', values, setFieldValue, errors, touched)}
        {renderInput('location', 'location', values, setFieldValue)}
        {renderInput(
          'foundationYear',
          'foundation Year',
          values,
          setFieldValue, errors, touched
        )}
        {renderInput('logo', 'logo URL', values, setFieldValue)}
        {renderFieldArray('movies', 'Movies:', values)}
        {renderFieldButton(studioItem.id, handleReturn, handleDelete, isValid)}
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={studioItem}
      validationSchema={schemaStudio}
      onSubmit={onSaveStudio}
    >
      {renderForm}
    </Formik>
  );
}
