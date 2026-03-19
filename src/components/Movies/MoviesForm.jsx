import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, TextField, Stack, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'; // за бажанням для Save
import {
  addMovieItemAsync,
  updateMovieItemAsync,
  deleteMovieItemAsync,
} from './../../store/slices/moviesSlices';
import { createNewMovie } from '../../model/initialState';

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

  const renderInput = (name, placeholder, values, setFieldValue) => (
    <Box position='relative' sx={{ m: 2 }}>
      <Field
        as={TextField}
        name={name}
        placeholder={placeholder}
        size='small'
        fullWidth
        sx={{
          '& legend': { display: 'none' },
          '& .MuiOutlinedInput-input': {
            fontSize: '14px',
            pr: '24px',
          },
        }}
      />
      {values[name] && (
        <Box
          onClick={() => setFieldValue(name, '')}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            right: 4,
            top: 6,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CloseIcon
            sx={{
              color: 'gray',

              width: 20,
              height: 20,
            }}
          />
        </Box>
      )}
    </Box>
  );

  const renderFieldArray = (name, placeholder, values, setFieldValue) => {
    return (
      <Box position='relative' sx={{ m: 2 }}>
        <FieldArray name={name}>
          {({ push, remove }) => (
            <Box>
              {values[name] &&
                values[name].map((_, index) => (
                  <Box
                    key={index}
                    position='relative'
                    sx={{ display: 'flex', alignItems: 'center', m: 2 }}
                  >
                    <Field
                      as={TextField}
                      name={`${name}.${index}`}
                      placeholder={placeholder}
                      variant='outlined'
                      size='small'
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          fontSize: '14px',
                          height: '12px',
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => remove(index)}
                      size='small'
                      color='error'
                      sx={{ ml: 1 }}
                    >
                      <DeleteForeverIcon fontSize='small' />
                    </IconButton>
                  </Box>
                ))}
              <Button
                startIcon={<AddIcon />}
                size='small'
                onClick={() => push('')}
                variant='outlined'
                sx={{
                  display: 'inline-flex',
                  fontSize: '12px',
                  ml: 2,
                  maxWidth: '200px',
                  whiteSpace: 'nowrap',
                }}
              >
                Add {placeholder}
              </Button>
            </Box>
          )}
        </FieldArray>
      </Box>
    );
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
