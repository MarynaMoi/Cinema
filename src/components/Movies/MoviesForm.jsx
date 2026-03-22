import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form } from 'formik';
import { Button, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'; 
//-----------------------
import {
  addMovieItemAsync,
  updateMovieItemAsync,
  deleteMovieItemAsync,
} from './../../store/slices/moviesSlices';
import { createNewMovie } from '../../model/initialState';
import { renderFieldArray, renderInput } from '../helpers';
//-----------------------

export default function MoviesForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = useSelector(state => state.moviesList.movies);

  const movieItem = id
    ? movies.find(a => a.id === id) ?? createNewMovie()
    : createNewMovie();
  console.log(id);

  const onSaveMovie = (values, { resetForm }) => {
    if (!values.id) {
      const newMovie = { ...values, id: nanoid() };
      dispatch(addMovieItemAsync(newMovie));
      resetForm();
    } else {
      dispatch(updateMovieItemAsync(values));
    }
  };

  const handleDelete = () => {
    dispatch(deleteMovieItemAsync(movieItem.id));
    if (!movieItem) {
      return <Typography>Loading Movie data...</Typography>;
    }
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        {renderInput('title', 'title', values, setFieldValue)}
        {renderFieldArray('actors', 'Actors List:', values, setFieldValue)}
        {renderFieldArray(
          'directors',
          'Directors List:',
          values,
          setFieldValue
        )}
        {renderFieldArray('studios', 'Studios List:', values, setFieldValue)}

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

          {movieItem.id !== null && (
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
    <Formik enableReinitialize initialValues={movieItem} onSubmit={onSaveMovie}>
      {renderForm}
    </Formik>
  );
}
