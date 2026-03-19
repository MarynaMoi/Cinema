import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function studioItem () {
  const { id } = useParams(); //отримую id з URL
  const studios = useSelector(state => state.studiosList.studios);

  const studio = studios.find(item => String(item.id) === String(id));
  if (!studio) {
    return <Typography>Loading studio data...</Typography>;
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
          src={studio.poster}
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
        <Typography variant='h3'>{studio.title}</Typography>
        <Typography>
          <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
            location:
          </Box>
          {studio.location}
        </Typography>
        <Typography>
          <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
            Foundation Year:
          </Box>
          {studio.foundationYear}
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
          {studio.movies.map((movies, index) => (
            <li key={index}> {`${movies}`}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}
