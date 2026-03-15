import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  addActorItemAsync,
  updateActorItemAsync,
  deleteActorItemAsync,
} from './../../store/slices/actorsSlices';
import { createNewActor } from '../../model/initialState';



function ActorsForm () {
  const dispatch = useDispatch();
  const { id } = useParams(); // отримую id з URL
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
  };

  const renderInput = (
    name,
    placeholder,
    values,
    setFieldValue,

  ) => (
    <Box position='relative'>
      <Field
        as={TextField}
        name={name}
        placeholder={placeholder}
        variant='outlined'
        size='small'
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

        <div>
          <Button type='submit' variant='contained'>
            Save
          </Button>

          {actorItem.id !== null && (
            <Button type='button' variant='outlined' onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={actorItem}

      onSubmit={onSaveActor}
    >
      {renderForm}
    </Formik>
  );
}

export default ActorsForm;








