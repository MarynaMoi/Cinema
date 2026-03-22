import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import ActorsList from '../Actors/ActorsList';

export default function Actors () {
  return (
    <Stack spacing={2}>
      <Link to='/actors/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add actor</Button>
      </Link>
      <ActorsList  />
    </Stack>
  );
}

