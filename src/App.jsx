import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Movies from './components/Movies/Movies';
import Actors from './components/Actors/Actors';
import Studios from './components/Studios/Studios';
import Directors from './components/Directors/Directors';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout';

function App () {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#9ec2e5' : '#5e5b5b', 
        paper: mode === 'light' ? '#d3e0fa' : '#1e1e1e', 
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'greenBtn' }, 
            style: {
              background: 'linear-gradient(45deg, #a5ca40 30%, #FF8E53 90%)',
              color: 'white',
            },
          },
        ],
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            width: '80%',
            margin: '8px', 
            justifyContent: 'flex-start',

            whiteSpace: 'nowrap', 
            overflow: 'hidden',
            minWidth: 0, 
            textAlign: 'center',
            display: 'block',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            padding: '8px',
            
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Layout toggleTheme={toggleTheme} mode={mode} />}
          >
            <Route path='/movies/*' element={<Movies />} />
            <Route path='/actors/*' element={<Actors />} />
            <Route path='/studios/*' element={<Studios />} />
            <Route path='/directors/*' element={<Directors />} />
            <Route index element={<HomePage />} />
            <Route
              path='*'
              element={<Navigate to='/' replace={true} />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
