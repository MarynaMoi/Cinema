import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

// import { getMoviesAsync } from './../../store/slices/MoviesSlices';
import { getMoviesAsync } from './../../store/slices/moviesSlices';
import MoviesList from '../Movies/MoviesList';

export default function Movies () {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.moviesList.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, []);

  const onSelectMovie = id => {
    navigate(`/movies/${id}`);
  };

  return (
    <Stack spacing={2}>
      <Link to='/movies/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Movie</Button>
      </Link>
      {/* Link не визначає, що показати на новій стр, він лише змінює URL(to), для статичних посилань */}
      {/* Route визначає що показувати (element) для конкретного URL(path) */}
      {/* Лінк та Роут не обов'язково повинні бути в одному компоненті */}
      <MoviesList
        movies={movies}
        onSelectMovie={onSelectMovie}
        // navigate змінює url сторінки, використовують (можна у функ, обробниках), коли шлях залежить від даних
      />
    </Stack>

  );
}
