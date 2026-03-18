import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { TextField, Stack, IconButton, Paper } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
export default function Header ({ toggleTheme, mode }) {
  return (
    <Paper >
      <Stack
        direction='row'
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          
        }}
      >
        <Stack  direction='row'>
          <MovieFilterIcon />
          <Box component='span' sx={{ fontSize: '20px' }}>
            CINEMA MANAGER 
          </Box>
        </Stack>

        <Button onClick={toggleTheme} variant='outlined' sx={{ width: '58px', height: '40px' }}>
          {mode === 'light' ? (
            <NightlightRoundOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </Button>
      </Stack>
    </Paper>
  );
}
