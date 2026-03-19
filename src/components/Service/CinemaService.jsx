import { Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';

import ActorsForm from '../Actors/ActorsForm';
import ActorsItem from '../Actors/ActorItem';
import MoviesForm from '../Movies/MoviesForm';
import MoviesItem from '../Movies/MovieItem';
import DirectorsForm from '../Directors/DirectorsForm';
import DirectorsItem from '../Directors/DirectorItem';
import StudiosForm from '../Studios/StudiosForm';
import StudiosItem from '../Studios/StudioItem';

export default function CinemaService () {
  return (
    <>
      <Typography variant='h4' sx={{ mt: '16px', textAlign: 'center' }}>
        Cinema Service
      </Typography>
      <Routes>
        <Route path='/actors/new' element={<ActorsForm />} />
        <Route path='/actors/:id' element={<ActorsItem />} />
        <Route path='/actors/:id/edit' element={<ActorsForm />} />
        <Route path='/movies/new' element={<MoviesForm />} />
        <Route path='/movies/:id' element={<MoviesItem />} />
        <Route path='/movies/:id/edit' element={<MoviesForm />} />
        <Route path='/directors/new' element={<DirectorsForm />} />
        <Route path='/directors/:id' element={<DirectorsItem />} />
        <Route path='/directors/:id/edit' element={<DirectorsForm />} />
        <Route path='/studios/new' element={<StudiosForm />} />
        <Route path='/studios/:id/' element={<StudiosItem />} /> */
        <Route path='/studios/:id/edit' element={<StudiosForm />} /> */
      </Routes>
    </>
  );
}
