
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  deleteActorItemAsync,
  updateActorItemAsync,
  addActorItemAsync,
} from './../../store/slices/actorsSlices';


// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email required'),
//   phone: yup
//     .string()
//     .max(13, 'Maximum length for phone number is 13 characters')
//     .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX')
//     .required('Phone required'),
// });

function ActorsForm () {
  const dispatch = useDispatch();
  const actorItem = useSelector(state => state.actorsList.actorItem);

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
    errors = {},
    touched = {}
  ) => (
    <Box position='relative'>
      <Field
        as={TextField}
        name={name}
        placeholder={placeholder}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
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

      {values[name] && 
      (
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
              backgroundColor: '#ffffff'
            }}
          />
        </Box>
      )
      } 
    </Box>
  );

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
    return (
      <Form >
        {renderInput('fullname', 'Full Name', values, setFieldValue)}
        {/* {renderInput('lastName', 'Last Name', values, setFieldValue)}
        {renderInput('email', 'Email', values, setFieldValue, errors, touched)}
        {renderInput('phone', 'Phone', values, setFieldValue, errors, touched)} */}

        <div >
          <Button type='submit' variant='contained' 
          // disabled={!isValid}
          >
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
      // validationSchema={schema}
      onSubmit={onSaveActor}
    >
      {renderForm}
    </Formik>
  );
}

export default ActorsForm;
