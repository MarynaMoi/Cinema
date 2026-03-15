import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Actors from './components/Actors/Actors';
import Studios from '../src/components/Studios';
import Directors from './components/Directors/Directors';
import HomePage from './components/HomePage/HomePage';
import Layout from './components/Layout';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/movies/*' element={<Movies />} />
          {/* Route визначає що показувати (element) для конкретного URL(path) */}
          <Route path='/actors/*' element={<Actors />} />
          <Route path='/studios/*' element={<Studios />} />
          <Route path='/directors/*' element={<Directors />} />
          <Route index element={<HomePage />} />
          {/* індексний роут (пов'язано з Layout)*/}
          <Route path='*' element={<Navigate to='/movies' replace={true} />} />
          {/* '/*' - для дочірніх компонентів, щоб не прописувати повністю шлях */}
          {/* replace={true} - записує в історію переходи на переадресовані сторінки */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


