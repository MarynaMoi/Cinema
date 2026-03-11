import { Route, Routes } from 'react-router-dom';
import ActorsForm from '../Actors/ActorsForm';
import DirectorsForm from '../Directors/DirectorsForm';
import MoviesForm from '../Movies/MoviesForm';
import StudiousForm from '../Studios/StudiousForm';

export default function CinemaService () {
  return (
    <>
      <h2>CinemaService</h2>
      <Routes>
        <Route path='/actors/new' element={<ActorsForm />} />
        <Route path='/actors/new/:id' element={<ActorsForm />} />
        <Route path='/directors/new' element={<DirectorsForm />} />
        <Route path='/directors/new/:id' element={<DirectorsForm />} />
        <Route path='/movies/new' element={<MoviesForm />} />
        <Route path='/movies/new/:id' element={<MoviesForm />} />
        <Route path='/studious/new' element={<StudiousForm />} />
        <Route path='/studious/new/:id' element={<StudiousForm />} />
      </Routes>
    </>
  );
}
