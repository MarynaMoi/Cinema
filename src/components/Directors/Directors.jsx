import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

import { getDirectorsAsync } from './../../store/slices/directorsSlices';
import DirectorsList from '../Directors/DirectorsList';

export default function Directors () {
  const dispatch = useDispatch();
  const directors = useSelector(state => state.directorsList.directors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDirectorsAsync());
  }, []);

  const onSelectDirector = id => {
    navigate(`/directors/${id}`);
  };

  return (
    <Stack spacing={2}>
      <Link to='/directors/new' style={{ textDecoration: 'none' }}>
        <Button variant='greenBtn'>Add Director</Button>
      </Link>

      <DirectorsList
        directors={directors}
        onSelectDirector={onSelectDirector}
      />
    </Stack>
  );
}
