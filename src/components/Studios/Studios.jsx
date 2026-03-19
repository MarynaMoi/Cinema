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
      <Link to='/studios/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Studio</Button>
      </Link>
      <StudiosList studios={studios} onSelectStudio={onSelectStudio} />
    </Stack>
  );
}
