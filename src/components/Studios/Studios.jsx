import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import StudiosList from '../Studios/StudiosList';

export default function Studios () {
  return (
    <Stack spacing={2}>
      <Link to='/studios/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Studio</Button>
      </Link>
      <StudiosList />
    </Stack>
  );
}
