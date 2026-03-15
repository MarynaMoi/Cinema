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

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
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



// export default function ActorsForm () {
//   const dispatch = useDispatch();
//   const { id } = useParams(); // id актора або undefined для нового
//   const actors = useSelector(state => state.actorsList.actors);

//   const actorItem = id
//     ? actors.find(a => a.id === id) ?? createNewActor()
//     : createNewActor();
//   console.log(id);


//   const onSaveActor = (values, { resetForm }) => {
//     if (!values.id) {
//       dispatch(addActorItemAsync({ ...values, id: nanoid() }));
//       resetForm();
//     } else {
//       dispatch(updateActorItemAsync(values));
//     }
//   };

//   const handleDelete = () => {
//     if (actorItem?.id) dispatch(deleteActorItemAsync(actorItem.id));
//   };

//   const renderInput = (
//     name,
//     placeholder,
//     values,
//     setFieldValue,
//     errors = {},
//     touched = {}
//   ) => (
//     <Box position='relative' mb={1}>
//       <Field
//         as={TextField}
//         name={name}
//         placeholder={placeholder}
//         error={touched[name] && Boolean(errors[name])}
//         helperText={touched[name] && errors[name]}
//         variant='outlined'
//         size='small'
//         fullWidth
//       />
//       {values?.[name] && (
//         <Box
//           onClick={() => setFieldValue(name, '')}
//           sx={{
//             cursor: 'pointer',
//             position: 'absolute',
//             right: 4,
//             top: 6,
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <CloseIcon fontSize='small' />
//         </Box>
//       )}
//     </Box>
//   );

//   const renderForm = ({ values, setFieldValue, touched, errors }) => (
//     <Form>
//       {renderInput(
//         'fullname',
//         'Full Name',
//         values,
//         setFieldValue,
//         errors,
//         touched
//       )}
//       {renderInput(
//         'birthday',
//         'Birthday',
//         values,
//         setFieldValue,
//         errors,
//         touched
//       )}
//       {renderInput(
//         'nationality',
//         'Nationality',
//         values,
//         setFieldValue,
//         errors,
//         touched
//       )}

//       <Stack direction='row' spacing={1} mt={1}>
//         <Button type='submit' variant='contained'>
//           Save
//         </Button>
//         {actorItem?.id && (
//           <Button type='button' variant='outlined' onClick={handleDelete}>
//             Delete
//           </Button>
//         )}
//       </Stack>
//     </Form>
//   );

//   return (
//     <Formik enableReinitialize initialValues={actorItem} onSubmit={onSaveActor}>
//       {formikProps => renderForm(formikProps)}
//     </Formik>
//   );
// }