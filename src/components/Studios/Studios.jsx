import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import { getStudiosAsync } from './../../store/slices/studiosSlices';
import StudiosList from '../Studios/StudiosList';

export default function Studios () {
  const dispatch = useDispatch();
  const studios = useSelector(state => state.studiosList.studios);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudiosAsync());
  }, []);

  const onSelectStudio = id => {
    navigate(`/Studios/${id}`);
  };

  return (
    <Stack spacing={2}>
      <Link to='/Studios/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Studio</Button>
      </Link>
      {/* Link не визначає, що показати на новій стр, він лише змінює URL(to), для статичних посилань */}
      {/* Route визначає що показувати (element) для конкретного URL(path) */}
      {/* Лінк та Роут не обов'язково повинні бути в одному компоненті */}
      <StudiosList
        studios={studios}
        onSelectStudio={onSelectStudio}
        // navigate змінює url сторінки, використовують (можна у функ, обробниках), коли шлях залежить від даних
      />
    </Stack>
    //       <Routes>
    //         <Route path=':id' element={<StudioItem />} />
    //         {/* <Route index element={<StudiosList />} /> */}
    //         {/* <Route path='new' element={<StudiosForm />} /> */}
    //         <Route path='new' element={<Navigate to='/Studios/new/:id' />} />
    //         {/* переадресація*/}

    //       </Routes>
  );
}
