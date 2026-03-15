import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Stack } from '@mui/material';

import { getActorsAsync } from './../../store/slices/actorsSlices';
import ActorsList from '../Actors/ActorsList';

export default function Actors () {
  const dispatch = useDispatch();
  const actors = useSelector(state => state.actorsList.actors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getActorsAsync());
  }, []);

  const onSelectActor = id => {
    navigate(`/actors/${id}`);
  };

  return (
    <Stack spacing={2}>
      <Link to='/actors/new'>
        <button>Add actor</button>
      </Link>
      {/* Link не визначає, що показати на новій стр, він лише змінює URL(to), для статичних посилань */}
      {/* Route визначає що показувати (element) для конкретного URL(path) */}
      {/* Лінк та Роут не обов'язково повинні бути в одному компоненті */}
      <ActorsList
        actors={actors}
        onSelectActor={onSelectActor}
        // navigate змінює url сторінки, використовують (можна у функ, обробниках), коли шлях залежить від даних
      />
    </Stack>
    //       <Routes>
    //         <Route path=':id' element={<ActorItem />} />
    //         {/* <Route index element={<ActorsList />} /> */}
    //         {/* <Route path='new' element={<ActorsForm />} /> */}
    //         <Route path='new' element={<Navigate to='/actors/new/:id' />} />
    //         {/* переадресація*/}

    //       </Routes>
  );
}

