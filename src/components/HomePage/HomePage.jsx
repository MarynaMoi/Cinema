import Carousel from 'react-material-ui-carousel';
import { posters } from '../../constants/';
import { Box } from '@mui/material';

export default function HomePage () {
  return (
    <>
      <Carousel>
        {posters.map((poster) => {
          return (
            <Box key={poster.id}>
              <img src={poster.url} alt={poster.alt} />
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}
