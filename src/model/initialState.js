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
    releaseYear: '',
    directors: [],
    actors: [],
    studios: [],
    poster: '',
  };
};

export const directorsState = [];
export const DIRECTOR_SLICE_NAME = 'directors';
export const createNewDirector = () => {
  return {
    id: null,
    fullname: '',
    birthday: '',
    nationality: '',
    movies: [],
    image: '',
  };
};

export const studiosState = [];
export const STUDIO_SLICE_NAME = 'studios';
export const createNewStudio = () => {
  return {
    id: null,
    title: '',
    foundationYear: '',
    location: '',
    movies: [],
    logo: '',
  };
};
