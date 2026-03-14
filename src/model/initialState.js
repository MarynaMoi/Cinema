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
