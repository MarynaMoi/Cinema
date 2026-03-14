import { useDispatch } from 'react-redux';
import {
  deleteActorItemAsync,
  selectActor,
} from '../../store/slices/actorsSlices';

import { Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ActorItem ({ actor }) {
  const dispatch = useDispatch();

  const handleDelete = ev => {
    ev.stopPropagation();
    dispatch(deleteActorItemAsync(actor.id));
  };

  const onSelectActor = ev => {
    ev.stopPropagation();
    dispatch(selectActor(actor));
  };

  return (
    <Paper
      elevation={1}
      onClick={onSelectActor}
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
      <span>{actor.fullname}</span>

      <CloseIcon
        onClick={handleDelete}
        fontSize='small'
        sx={{
          color: 'gray',
          width: 18,
          height: 18,
          boxSizing: 'content-box',
          backgroundColor: '#ffffff',
        }}
      />
    </Paper>
  );
}

export default ActorItem;
