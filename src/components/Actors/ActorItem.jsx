import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ActorItem () {
  const { id } = useParams(); //отримую id з URL
  const actors = useSelector(state => state.actorsList.actors);

  const actor = actors.find(item => String(item.id) === String(id));
  if (!actor) {
    return <Typography>Loading actor data...</Typography>;
  }
  return (
    <Box
      sx={{
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
          sx={{ width: 240, height: 320, fontSize: '100px' }}
        >
          <AccountCircleIcon sx={{ fontSize: 'inherit', color: 'gray' }} />
          {/* якщо картинка за посиланням відсутня */}
        </Avatar>
      </Box>

      {/* інфа*/}
      <Box>
        <Typography variant='h3'>{actor.fullname}</Typography>

        <Typography variant='body1'>
          <strong>Birthday:</strong> {actor.birthday}
        </Typography>

        <Typography variant='body1'>
          <strong>Nationality:</strong> {actor.nationality}
        </Typography>

        <Typography variant='h6'>Movies:</Typography>
        <ul>
          {actor.movies.map((movie, index) => (
            <li key={index}> {`${movie}`}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default ActorItem;
