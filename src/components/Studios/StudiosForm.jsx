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
import { renderFieldArray, renderFieldButton, renderInput } from '../helpers';
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
    // if (!studioItem) {
    //   return <Typography>Loading Studio data...</Typography>;
    // }
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        {renderInput('title', 'title', values, setFieldValue)}
        {renderInput('location', 'location', values, setFieldValue)}
        {renderInput(
          'foundationYear',
          'foundation Year',
          values,
          setFieldValue
        )}
        {renderInput('logo', 'logo URL', values, setFieldValue)}
        {renderFieldArray('movies', 'Movies:', values)}
        {renderFieldButton(studioItem.id, handleReturn, handleDelete)}
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={studioItem}
      onSubmit={onSaveStudio}
    >
      {renderForm}
    </Formik>
  );
}
