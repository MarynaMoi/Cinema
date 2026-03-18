import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function MovieItem () {
  const { id } = useParams(); //отримую id з URL
  const movies = useSelector(state => state.moviesList.movies);

  const movie = movies.find(item => String(item.id) === String(id));
  if (!movie) {
    return <Typography>Loading movie data...</Typography>;
  }
  return (
    <Paper
      sx={{
        m: '16px',
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
      }}
    >
      {/* фото */}
      <Box sx={{ maxWidth: 240 }}>
        <Avatar
          src={movie.poster}
          variant='rounded'
          sx={{
            width: '100%',
            maxWidth: 240,
            height: 'auto',
            aspectRatio: '3 / 4', // Співвідношення сторін
            fontSize: '100px',
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 'inherit', color: 'gray' }} />
          {/* якщо картинка за посиланням відсутня аватар підсовує іконку*/}
        </Avatar>
      </Box>

      <Box>
        <Typography variant='h3'>{movie.title}</Typography>

        <Typography variant='h6' sx={{ fontWeight: 600, mt: '8px' }}>
          Actors:
        </Typography>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
          }}
        >
          {movie.actors.map((actor, index) => (
            <li key={index}> {`${actor}`}</li>
          ))}
        </ul>
        <Typography variant='h6' sx={{ fontWeight: 600, mt: '8px' }}>
          Directors:
        </Typography>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
          }}
        >
          {movie.directors.map((director, index) => (
            <li key={index}> {`${director}`}</li>
          ))}
        </ul>
        <Typography variant='h6' sx={{ fontWeight: 600, mt: '8px' }}>
          Studios:
        </Typography>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
          }}
        >
          {movie.studios.map((studio, index) => (
            <li key={index}> {`${studio}`}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}
