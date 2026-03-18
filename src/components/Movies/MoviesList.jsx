import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//------------------------------------------------
import { deleteMovieItemAsync } from '../../store/slices/moviesSlices';
//------------------------------------------------

export default function MoviesList ({ movies }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = id => {
    console.log('handleDelete', id);
    dispatch(deleteMovieItemAsync(id));
  };
  const handleEdit = (ev, id) => {
    ev.preventDefault(); 
    // ігнор основного Link
    ev.stopPropagation();
    console.log('handleEdit', id);
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
                {/* відштовхує іконки в кінець */}
                {movie.title || 'Unnamed movie'}
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
