import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
//--------------------------------
import Header from './Header/Header';
import CinemaService from './CinemaService/CinemaService';
import Footer from './Footer/Footer';
import NavBar from './Navigation/NavBar';
//----------------------------------------

export default function Layout ({ toggleTheme, mode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', 
        overflow: 'hidden', 
      }}
    >
      <Header toggleTheme={toggleTheme} mode={mode} />

    
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexGrow: 1, 
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box sx={{ flex: 2, overflowY: 'auto' }}>
          <NavBar />
        </Box>

        <Box sx={{ flex: 4, overflowY: 'auto', p: 2, maxWidth: '600px' }}>
          <Outlet />
        </Box>

        <Box sx={{ flex: 6, overflowY: 'auto' }}>
          <CinemaService />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
