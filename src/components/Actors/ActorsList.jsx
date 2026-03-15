import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//------------------------------------------------
import { deleteActorItemAsync } from '../../store/slices/actorsSlices';
//------------------------------------------------

export default function ActorsList ({ actors }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = id => {
    console.log('handleDelete', id);
    dispatch(deleteActorItemAsync(id));
  };
  const handleEdit = (ev, id) => {
    ev.preventDefault(); 
    // ігнор основного Link
    ev.stopPropagation();
    console.log('handleEdit', id);
    navigate(`/actors/${id}/edit`);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {actors.map(actor => (
        <li key={actor.id} style={{ marginBottom: '8px' }}>
          <Link
            to={`/actors/${actor.id}`}
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
                {actor.fullname || 'Unnamed actor'}
              </span>
              <DeleteForeverIcon onClick={() => handleDelete(actor.id)} />
              <EditIcon onClick={ev => handleEdit(ev, actor.id)} />
            </Paper>
          </Link>
        </li>
      ))}
    </ul>
  );
}
