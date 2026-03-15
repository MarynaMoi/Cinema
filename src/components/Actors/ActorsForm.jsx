import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, TextField, Stack, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
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
        variant='outlined'
        size='small'
        fullWidth
        sx={{
          '& legend': { display: 'none' },
          '& .MuiOutlinedInput-input': {
            fontSize: '14px',
            height: '12px',
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
            fontSize='small'
            sx={{
              color: 'gray',
              width: 18,
              height: 18,
              boxSizing: 'content-box',
              backgroundColor: '#ffffff',
            }}
          />
        </Box>
      )}
    </Box>
  );

  const renderForm = ({ values, setFieldValue }) => {
    return (
      <Form>
        {renderInput('fullname', 'Full Name', values, setFieldValue)}
        {renderInput('birthday', 'birthday', values, setFieldValue)}
        {renderInput('nationality', 'nationality', values, setFieldValue)}
        {renderInput('image', 'image URL', values, setFieldValue)}
        Movies List
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
                sx={{ textTransform: 'none', fontSize: '12px', m: 2 }}
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
            type='submit'
            variant='contained'
            sx={{ textTransform: 'none' }}
          >
            Save
          </Button>

          {actorItem.id !== null && (
            <Button
              type='button'
              variant='outlined'
              onClick={handleDelete}
              sx={{ textTransform: 'none' }}
            >
              Reset
            </Button>
          )}
          <Button
            type='button'
            onClick={handleReturn}
            variant='contained'
            sx={{ textTransform: 'none' }}
          >
            Return
          </Button>
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
