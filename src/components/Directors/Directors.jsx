import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import DirectorsList from '../Directors/DirectorsList';

export default function Directors () {
  return (
    <Stack spacing={2}>
      <Link to='/directors/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Director</Button>
      </Link>
      <DirectorsList />
    </Stack>
  );
}
