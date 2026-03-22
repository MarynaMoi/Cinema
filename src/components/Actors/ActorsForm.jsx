import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form,} from 'formik';
import { Button, Stack,  } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'; 
//-----------------------
import {
  addActorItemAsync,
  updateActorItemAsync,
  deleteActorItemAsync,
} from './../../store/slices/actorsSlices';
import { createNewActor } from '../../model/initialState';
import { renderFieldArray, renderInput } from '../helpers';
//-----------------------



export default function ActorsForm () {
  const dispatch = useDispatch();
  const { id } = useParams(); // отримую id з URL
  const navigate = useNavigate();
  const actors = useSelector(state => state.actorsList.actors);

  const actorItem = id
    ? actors.find(a => a.id === id) ?? createNewActor()
    : createNewActor();
  console.log(id);

  const onSaveActor = (values, { resetForm }) => {
    console.log(values);
    if (!values.id) {
      const newActor = { ...values, id: nanoid() };
      dispatch(addActorItemAsync(newActor));
      resetForm();
    } else {
      dispatch(updateActorItemAsync(values));
    }
  };

  const handleDelete = () => {
    dispatch(deleteActorItemAsync(actorItem.id));
    if (!actorItem) {
      return <Typography>Loading actor data...</Typography>;
    }
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
    // прибирає /(останню частину шляху)
  };


  const renderForm = ({ values, setFieldValue }) => {
    //setFieldValue - ф-я форміка по зміні стану
    return (
      <Form>
        {renderInput('fullname', 'Full Name', values, setFieldValue)}
        {renderInput('birthday', 'Birthday', values, setFieldValue)}
        {renderInput('nationality', 'Nationality', values, setFieldValue)}
        {renderInput('image', 'image URL', values, setFieldValue)}
        {renderFieldArray('movies', 'Movies List:', values, setFieldValue)}
    
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-around',
            m: 2,
          }}
        >
          <Button
            type='button'
            variant='contained'
            onClick={handleReturn}
            startIcon={<ArrowBackIcon />}
            sx={{
              display: 'inline-flex',
            }}
          >
            Return
          </Button>

          <Button
            type='submit'
            variant='contained'
            color='success' // робить кнопку зеленою
            startIcon={<SaveIcon />}
            sx={{
              display: 'inline-flex',
            }}
          >
            Save
          </Button>

          {actorItem.id !== null && (
            <Button
              type='button'
              variant='outlined'
              color='error' // робить кнопку червоною
              onClick={handleDelete}
              startIcon={<DeleteForeverIcon />}
              sx={{
                display: 'inline-flex',
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Form>
    );
  };

  return (
    <Formik enableReinitialize initialValues={actorItem} onSubmit={onSaveActor}>
      {renderForm}
    </Formik>
  );
}
