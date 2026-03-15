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

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {actors.map(actor => (
        <li key={actor.id} style={{ marginBottom: '8px' }}>
          <Link
            to={`/actors/${actor.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ActorItem actor={actor} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
