import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function DirectorItem () {
  const { id } = useParams();
  const directors = useSelector(state => state.directorsList.directors);

  const director = directors.find(item => String(item.id) === String(id));
  if (!director) {
    return <Typography>Loading director data...</Typography>;
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
      <Box sx={{ maxWidth: 240 }}>
        <Avatar
          src={director.image}
          variant='rounded'
          sx={{
            width: '100%',
            maxWidth: 240,
            height: 'auto',
            aspectRatio: '3 / 4',
            fontSize: '100px',
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 'inherit', color: 'gray' }} />
        </Avatar>
      </Box>

      <Box>
        <Typography variant='h3'>{director.fullname}</Typography>

        <Typography>
          <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
            Birthday:
          </Box>
          {director.birthday}
        </Typography>

        <Typography>
          <Box component='span' sx={{ fontWeight: 600, mr: 1 }}>
            Nationality:
          </Box>
          {director.nationality}
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
          {director.movies.map((movie, index) => (
            <li key={index}> {`${movie}`}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}
