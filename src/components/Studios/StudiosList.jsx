import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//------------------------------------------------
import {
  deleteStudioItemAsync,
  getStudiosAsync,
} from '../../store/slices/studiosSlices';
//------------------------------------------------

export default function studiosList () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studios = useSelector(state => state.studiosList.studios);

  useEffect(() => {
    dispatch(getStudiosAsync());
  }, []);

  const handleDelete = id => {
    dispatch(deleteStudioItemAsync(id));
  };
  const handleEdit = (ev, id) => {
    ev.preventDefault();
    ev.stopPropagation();
    navigate(`/studios/${id}/edit`);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {studios.map(studio => (
        <li key={studio.id} style={{ marginBottom: '8px' }}>
          <Link
            to={`/studios/${studio.id}`}
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
                {studio.title}
              </span>
              <DeleteForeverIcon onClick={() => handleDelete(studio.id)} />
              <EditIcon onClick={ev => handleEdit(ev, studio.id)} />
            </Paper>
          </Link>
        </li>
      ))}
    </ul>
  );
}
