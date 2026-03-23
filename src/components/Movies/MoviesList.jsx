import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//------------------------------------------------
import {
  deleteMovieItemAsync,
  getMoviesAsync,
} from '../../store/slices/moviesSlices';
//------------------------------------------------

export default function MoviesList () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector(state => state.moviesList.movies);

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, []);

  const handleDelete = id => {
    dispatch(deleteMovieItemAsync(id));
  };

  const handleEdit = (ev, id) => {
    ev.preventDefault();
    ev.stopPropagation();
    navigate(`/movies/${id}/edit`);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {movies.map(movie => (
        <li key={movie.id} style={{ marginBottom: '8px' }}>
          <Link
            to={`/movies/${movie.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Paper
              sx={{
                m: '10px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <span style={{ flexGrow: 1 }}>
                {movie.title}
              </span>
              <DeleteForeverIcon onClick={() => handleDelete(movie.id)} />
              <EditIcon onClick={ev => handleEdit(ev, movie.id)} />
            </Paper>
          </Link>
        </li>
      ))}
    </ul>
  );
}
