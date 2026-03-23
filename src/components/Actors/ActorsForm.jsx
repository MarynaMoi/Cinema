import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form } from 'formik';
//-----------------------
import {
  addActorItemAsync,
  updateActorItemAsync,
  deleteActorItemAsync,
} from './../../store/slices/actorsSlices';
import { createNewActor } from '../../model/initialState';
import {
  renderFieldArray,
  renderInput,
  renderFieldButton,
} from '../helpersRender';
import { schemaActor } from '../../util/schema';
//-----------------------

export default function ActorsForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const actors = useSelector(state => state.actorsList.actors);

  const actorItem = id
    ? actors.find(a => a.id === id) ?? createNewActor()
    : createNewActor();

  const onSaveActor = (values, { resetForm }) => {
    console.log(values);
    if (!values.id) {
      const newActor = { ...values, id: nanoid() };
      dispatch(addActorItemAsync(newActor));
      resetForm();
    } else {
      dispatch(updateActorItemAsync(values));
      navigate('..', { relative: 'path' });
    }
  };

  const handleDelete = () => {
    dispatch(deleteActorItemAsync(actorItem.id));
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
    return (
      <Form>
        {renderInput(
          'fullname',
          'Full Name *',
          values,
          setFieldValue,
          errors,
          touched
        )}
        {renderInput(
          'birthday',
          'Birthday',
          values,
          setFieldValue,
          errors,
          touched,
          'date'
        )}
        {renderInput('nationality', 'Nationality', values, setFieldValue)}
        {renderInput('image', 'image URL', values, setFieldValue)}
        {renderFieldArray('movies', 'Movies:', values)}
        {renderFieldButton(actorItem.id, handleReturn, handleDelete, isValid)}
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={actorItem}
      validationSchema={schemaActor}
      onSubmit={onSaveActor}
    >
      {renderForm}
    </Formik>
  );
}
