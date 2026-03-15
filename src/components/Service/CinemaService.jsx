import { Routes, Route, Outlet } from "react-router-dom";
import Actors from "../Actors/Actors";
import ActorsForm from "../Actors/ActorsForm";

export default function CinemaService() {
  return (
    <>
      <h2>CinemaService</h2>
      <Routes>
          <Route path="/actors/new" element={<ActorsForm />} />
          <Route path="/actors/:id" element={<ActorsForm />} />
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
