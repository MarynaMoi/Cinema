import { Button, Stack } from '@mui/material';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import ActorsItem from './ActorsItem';
import ActorsList from './ActorsList';

export default function Actors () {
  return (
    <>
      <Stack>
        {' '}
        <Link to='new'>
          <Button>Add actor</Button>
        </Link>
      </Stack>
      <Routes>
        <Route path=':id' element={<ActorsItem/>}/>
        <Route path='/' element={<ActorsList/>}/>
        <Route path='new' element={<Navigate to='/actors/new/:id'/>}/>
         {/* переадресація*/}
      </Routes>
    </>
  );
}
