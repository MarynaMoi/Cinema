import { useState, useMemo } from 'react';
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
import Studios from '../src/components/Studios';
import Directors from './components/Directors/Directors';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout';

function App () {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#9ec2e5' : '#5e5b5b', // фон сторінки
        paper: mode === 'light' ? '#d3e0fa' : '#1e1e1e', // фон хедера/паперу
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'greenBtn' }, // власний варіант
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
            margin: '8px', // m: 2 (2 * 8px)
            justifyContent: 'flex-start',

            whiteSpace: 'nowrap', // заборона переносу на новий рядок
            overflow: 'hidden', // ховає все, що не помістилося
            minWidth: 0, // дозволяє флекс елементу стискатися менше свого контенту
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
      {/* CssBaseline потрібен для зміни теми? та скидання базових налаштувань */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* Передаємо ф-ю в Layout, щоб там намалювати кнопку */}
          <Route
            path='/'
            element={<Layout toggleTheme={toggleTheme} mode={mode} />}
          >
            <Route path='/movies/*' element={<Movies />} />
            {/* Route визначає що показувати (element) для конкретного URL(path) */}
            <Route path='/actors/*' element={<Actors />} />
            <Route path='/directors/*' element={<Directors />} />
            <Route index element={<HomePage />} />
            {/* індексний роут (пов'язано з Layout)*/}
            <Route
              path='*'
              element={<Navigate to='/movies' replace={true} />}
            />
            {/* '/*' - для дочірніх компонентів, щоб не прописувати повністю шлях */}
            {/* replace={true} - записує в історію переходи на переадресовані сторінки */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
