import { Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';


import ActorsForm from '../Actors/ActorsForm';
import ActorsItem from '../Actors/ActorItem';
import MoviesForm from '../Movies/MoviesForm';
import MoviesItem from '../Movies/MovieItem';



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
      </Routes>
    </>
  );
}

{
  /* <Route path='/directors/new' element={<DirectorsForm />} />
        <Route path='/directors/new/:id' element={<DirectorsForm />} />
        <Route path='/movies/new' element={<MoviesForm />} />
        <Route path='/movies/new/:id' element={<MoviesForm />} />
        <Route path='/studious/new' element={<StudiousForm />} />
        <Route path='/studious/new/:id' element={<StudiousForm />} /> */
}
