import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form, } from 'formik';
import { Button, Stack,  } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'; 
//-----------------------
import {
  addStudioItemAsync,
  updateStudioItemAsync,
  deleteStudioItemAsync,
} from './../../store/slices/studiosSlices';
import { createNewStudio } from '../../model/initialState';
import { renderFieldArray, renderInput } from '../helpers';
//-----------------------

export default function StudiosForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const studios = useSelector(state => state.studiosList.studios);

  const studioItem = id
    ? studios.find(a => a.id === id) ?? createNewStudio()
    : createNewStudio();
  console.log(id);

  const onSaveStudio = (values, { resetForm }) => {
    if (!values.id) {
      const newStudio = { ...values, id: nanoid() };
      dispatch(addStudioItemAsync(newStudio));
      resetForm();
    } else {
      dispatch(updateStudioItemAsync(values));
    }
  };

  const handleDelete = () => {
    dispatch(deleteStudioItemAsync(studioItem.id));
    if (!studioItem) {
      return <Typography>Loading Studio data...</Typography>;
    }
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };


  const renderForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        {renderInput('title', 'title', values, setFieldValue)}
        {renderInput('location', 'location', values, setFieldValue)}
        {renderInput('foundationYear', 'foundationYear', values, setFieldValue)}
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

          {studioItem.id !== null && (
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
      initialValues={studioItem}
      onSubmit={onSaveStudio}
    >
      {renderForm}
    </Formik>
  );
}
