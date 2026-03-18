export const actorsState = [];
export const ACTOR_SLICE_NAME = 'actors';
export const createNewActor = () => {
  return {
    id: null,
    fullname: '',
    birthday: '',
    nationality: '',
    movies: [],
    image: '',
  };
};

export const moviesState = [];
export const MOVIE_SLICE_NAME = 'movies';
export const createNewMovie = () => {
  return {
    id: null,
    title: '',
    directors: [],
    actors: [],
    studios: [],
    poster: '',
  };
};
