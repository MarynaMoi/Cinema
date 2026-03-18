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
  addActorItemAsync,
  updateActorItemAsync,
  deleteActorItemAsync,
} from './../../store/slices/actorsSlices';
import { createNewActor } from '../../model/initialState';

function ActorsForm () {
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
            pr: '24px'
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
              // background: 'gray',
              width: 20,
              height: 20,
            }}
          />
        </Box>
      )}
    </Box>
  );

  const renderForm = ({ values, setFieldValue }) => {
    //setFieldValue - ф-я форміка по зміні стану
    return (
      <Form>
        {renderInput('fullname', 'Full Name', values, setFieldValue)}
        {renderInput('birthday', 'Birthday', values, setFieldValue)}
        {renderInput('nationality', 'Nationality', values, setFieldValue)}
        {renderInput('image', 'image URL', values, setFieldValue)}
        <Box sx={{ m: 2 }}>Movies List:</Box>
        <FieldArray name='movies'>
          {({ push, remove }) => (
            <Box>
              {values.movies &&
                values.movies.map((_, index) => (
                  <Box
                    key={index}
                    position='relative'
                    sx={{ display: 'flex', alignItems: 'center', m: 2 }}
                  >
                    <Field
                      as={TextField}
                      name={`movies.${index}`}
                      placeholder='Movie title'
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
                  maxWidth: '120px',
                  whiteSpace: 'nowrap',
                }}
              >
                Add movie
              </Button>
            </Box>
          )}
        </FieldArray>
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

export default ActorsForm;
