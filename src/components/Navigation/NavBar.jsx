import { Link } from 'react-router-dom';
import { Button, Paper } from '@mui/material';

export default function NavBar () {
  return (
    <Paper sx={{ m: '16px', p: 0 }}>
      {/* <Button>
        <Link to=''>Home</Link>
      </Button> */}
      <Button component={Link} to={''}>
        Home
      </Button>
      <Button component={Link} to={'/movies'}>
        Movies
      </Button>
      <Button component={Link} to={'/actors'}>
        Actors
      </Button>
      <Button component={Link} to={'/directors'}>
        Directors
      </Button>
      <Button component={Link} to={'/studios'}>
        Studios
      </Button>
    </Paper>
  );
}
