import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import CinemaService from './Service/CinemaService';
import Footer from './Footer/Footer';
import NavBar from './Navigation/NavBar';

export default function Layout () {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <div
        style={{
          display: 'flex',
          width: '100%',
          flexGrow: 1, // займає весь доступний простір між Header і Footer
          minHeight: 0, // потрібне для flex-контейнерів, щоб scroll працював
        }}
      >
        <div style={{ flex: 2, border: '1px solid red' }}>
          {' '}
          <NavBar />
        </div>
        <div style={{ flex: 6, border: '1px solid green' }}>
          <Outlet />
        </div>
        <div style={{ flex: 4, border: '1px solid blue' }}>
          <CinemaService />
        </div>
      </div>

      <Footer />
    </div>
  );
}

// export default function Layout () {
//   return (
//     <Box>
//       <Grid container direction='column'>
//         {' '}
//         <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
//           <Header />
//         </Grid>
//         <Grid item container>
//           <Grid item lg={2} md={2} xl={2} sm={2} xs={2}>
//             <NavBar />
//           </Grid>
//           <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
//             <Outlet />
//           </Grid>
//           <Grid item lg={4} md={4} xl={4} sm={4} xs={4}>
//             <CinemaService />
//           </Grid>
//         </Grid>
//         <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
//           <Footer />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
