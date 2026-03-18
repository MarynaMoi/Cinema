import Box from '@mui/material/Box';

import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import CinemaService from './Service/CinemaService';
import Footer from './Footer/Footer';
import NavBar from './Navigation/NavBar';

export default function Layout ({ toggleTheme, mode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // весь екран
        overflow: 'hidden', // заборона скролу ( тому хедер і футер стоять на місці.
        // середня частина також була б на місці,
        // але overflowY: 'auto' все таки дозволяє рухатись)
      }}
    >
      <Header toggleTheme={toggleTheme} mode={mode} />

      {/*  скролиться тільки серединка */}
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexGrow: 1, // займає весь простір між Header і Footer
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box sx={{ flex: 2, overflowY: 'auto' }}>
          {/* overflowY: 'auto' - скрол тільки цієї колонки*/}
          <NavBar />
        </Box>

        <Box sx={{ flex: 4, overflowY: 'auto', p: 2, maxWidth: '600px' }}>
          <Outlet />
          {/* показує вміст дочірніх маршрутів (акторс, муві)*/}
        </Box>

        <Box sx={{ flex: 6, overflowY: 'auto' }}>
          <CinemaService />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
