import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ActorItem from '../Actors/ActorItem';
import { getActorsAsync } from './../../store/slices/actorsSlices';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import {
  deleteActorItemAsync,
  selectActor,
} from '../../store/slices/actorsSlices';

export default function ActorsList ({ actors }) {
  const dispatch = useDispatch();
  const handleDelete = id=> {
    console.log('handleDelete', id)

    dispatch(deleteActorItemAsync(id));
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
              <ActorItem actor={actor} />
              {/* {actor.fullname || 'Unnamed actor'} */}
              <CloseIcon
                onClick={() => handleDelete(actor.id)}
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
          </Link>
        </li>
      ))}
    </ul>
  );
}

// export default function ActorsList ({ actors, onSelectActor }) {
//   const dispatch = useDispatch();
//   const handleDelete = id=> {
//     console.log('handleDelete', id)

//     dispatch(deleteActorItemAsync(id));
//   };
//   return (
//     <ul>
//       {actors.map(item => (
//         <li key={item.id}>
//           <Paper
//             onClick={() => onSelectActor(item.id)}
//             sx={{
//               m: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               cursor: 'pointer',
//               '&:hover': {
//                 boxShadow: 4,
//                 transform: 'translateY(-2px)',
//               },
//             }}
//           >
//             {item.fullname || 'Unnamed actor'}
//             <CloseIcon
//               onClick={() => handleDelete(item.id)}
//               fontSize='small'
//               sx={{
//                 color: 'gray',
//                 width: 18,
//                 height: 18,
//                 boxSizing: 'content-box',
//                 backgroundColor: '#ffffff',
//               }}
//             />
//           </Paper>
//         </li>
//       ))}
//     </ul>
//   );
// }
