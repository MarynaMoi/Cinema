import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
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

      <MoviesList movies={movies} onSelectMovie={onSelectMovie} />
    </Stack>
  );
}
