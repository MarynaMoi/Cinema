import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form, } from 'formik';
import { Button,  Stack, } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'; 
//-----------------------
import {
  addDirectorItemAsync,
  updateDirectorItemAsync,
  deleteDirectorItemAsync,
} from './../../store/slices/directorsSlices';
import { createNewDirector } from '../../model/initialState';
import { renderFieldArray, renderInput } from '../helpers';
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
    }
  };

  const handleDelete = () => {
    dispatch(deleteDirectorItemAsync(directorItem.id));
    if (!directorItem) {
      return <Typography>Loading director data...</Typography>;
    }
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
            color='success'
            startIcon={<SaveIcon />}
            sx={{
              display: 'inline-flex',
            }}
          >
            Save
          </Button>

          {directorItem.id !== null && (
            <Button
              type='button'
              variant='outlined'
              color='error'
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
    <Formik
      enableReinitialize
      initialValues={directorItem}
      onSubmit={onSaveDirector}
    >
      {renderForm}
    </Formik>
  );
}
