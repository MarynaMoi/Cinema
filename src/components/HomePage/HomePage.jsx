import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import data from '../../../db.json';

const styles = {
  imgContainerStyle: {
    position: 'relative',
    maxWidth: '100%',
    height: '70vh',
    overflow: 'hidden',
  },
  imgStyle: {
    borderRadius: '15px',
    padding: '5px',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',

    left: '50%',
    transform: 'translate(-50%,0)',
    objectFit: 'contain',
  },
};

const posters = data.movies.map(movie => ({
  id: movie.id,
  url: movie.poster,
  alt: movie.title,
}));

export default function HomePage () {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
      }}
      loop={true}
    >
      {posters.map(poster => {
        return (
          <SwiperSlide key={poster.id} style={styles.imgContainerStyle}>
            <img src={poster.url} alt={poster.alt} style={styles.imgStyle} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
