import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//------------------------------------------------
import {
  deleteDirectorItemAsync,
  getDirectorsAsync,
} from '../../store/slices/directorsSlices';
//------------------------------------------------

export default function DirectorsList () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directors = useSelector(state => state.directorsList.directors);

  useEffect(() => {
    dispatch(getDirectorsAsync());
  }, []);

  const handleDelete = id => {
    dispatch(deleteDirectorItemAsync(id));
  };
  
  const handleEdit = (ev, id) => {
    ev.preventDefault();
    ev.stopPropagation();
    navigate(`/directors/${id}/edit`);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {directors.map(director => (
        <li key={director.id} style={{ marginBottom: '8px' }}>
          <Link
            to={`/directors/${director.id}`}
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
                {director.fullname}
              </span>
              <DeleteForeverIcon onClick={() => handleDelete(director.id)} />
              <EditIcon onClick={ev => handleEdit(ev, director.id)} />
            </Paper>
          </Link>
        </li>
      ))}
    </ul>
  );
}
