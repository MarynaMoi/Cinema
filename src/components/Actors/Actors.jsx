import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import { getActorsAsync } from './../../store/slices/actorsSlices';
import ActorsList from '../Actors/ActorsList';

export default function Actors () {
  return (
    <Stack spacing={2}>
      <Link to='/actors/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add actor</Button>
      </Link>
      {/* Link змінює URL(to) */}
      {/* Route визначає що показувати (element) для конкретного URL(path) */}
      <ActorsList  />
    </Stack>
  );
}

