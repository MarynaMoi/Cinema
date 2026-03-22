import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import MoviesList from '../Movies/MoviesList';

export default function Movies () {
  return (
    <Stack spacing={2}>
      <Link to='/movies/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Movie</Button>
      </Link>
      <MoviesList />
    </Stack>
  );
}
