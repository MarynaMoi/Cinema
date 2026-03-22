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
        {renderFieldArray('actors', 'Actors:', values)}
        {renderFieldArray('directors', 'Directors:', values)}
        {renderFieldArray('studios', 'Studios:', values)}
        {renderFieldButton(movieItem.id, handleReturn, handleDelete)}
      </Form>
    );
  };

  return (
    <Formik enableReinitialize initialValues={movieItem} onSubmit={onSaveMovie}>
      {renderForm}
    </Formik>
  );
}
