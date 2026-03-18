import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ActorItem () {
  const { id } = useParams(); //отримую id з URL
  const actors = useSelector(state => state.actorsList.actors);

  const actor = actors.find(item => String(item.id) === String(id));
  if (!actor) {
    return <Typography>Loading actor data...</Typography>;
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
          src={actor.image}
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
        <Typography variant='h3'>{actor.fullname}</Typography>

        <Typography>
          <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
            Birthday:
          </Box>
          {actor.birthday}
        </Typography>

        <Typography>
          <Box component='span' sx={{ fontWeight: 600, mr: 1 }}>
            Nationality:
          </Box>
          {actor.nationality}
        </Typography>

        <Typography variant='h6' sx={{ fontWeight: 600, mt: '8px' }}>
          Movies:
        </Typography>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
          }}
        >
          {actor.movies.map((movie, index) => (
            <li key={index}> {`${movie}`}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}

export default ActorItem;
