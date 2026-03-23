import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
//-----------------------
import { Formik, Form } from 'formik';
//-----------------------
import {
  addMovieItemAsync,
  updateMovieItemAsync,
  deleteMovieItemAsync,
} from './../../store/slices/moviesSlices';
import { createNewMovie } from '../../model/initialState';
import { renderFieldArray, renderFieldButton, renderInput } from '../helpers';
import { schemaTitle } from '../../util/schema';
//-----------------------

export default function MoviesForm () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = useSelector(state => state.moviesList.movies);

  const movieItem = id
    ? movies.find(a => a.id === id) ?? createNewMovie()
    : createNewMovie();

  const onSaveMovie = (values, { resetForm }) => {
    if (!values.id) {
      const newMovie = { ...values, id: nanoid() };
      dispatch(addMovieItemAsync(newMovie));
      resetForm();
    } else {
      dispatch(updateMovieItemAsync(values));
      handleReturn();
    }
  };

  const handleDelete = () => {
    dispatch(deleteMovieItemAsync(movieItem.id));
  };
  const handleReturn = () => {
    navigate('..', { relative: 'path' });
  };

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
    return (
      <Form>
        {renderInput('title', 'title *', values, setFieldValue, errors, touched)}
        {renderInput('poster', 'poster URL:', values, setFieldValue)}
        {renderFieldArray('actors', 'Actors:', values)}
        {renderFieldArray('directors', 'Directors:', values)}
        {renderFieldArray('studios', 'Studios:', values)}
        {renderFieldButton(movieItem.id, handleReturn, handleDelete, isValid)}
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={movieItem}
      validationSchema={schemaTitle}
      onSubmit={onSaveMovie}
    >
      {renderForm}
    </Formik>
  );
}
