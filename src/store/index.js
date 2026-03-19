import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';

import  actorsReducer  from './slices/actorsSlices';
import  directorsReducer  from './slices/directorsSlices';
import  moviesReducer  from './slices/moviesSlices';
import studiosReducer  from './slices/studiosSlices';

export default configureStore({
  reducer: {
    actorsList: actorsReducer,
    directorsList: directorsReducer,
    moviesList: moviesReducer,
    studiosList: studiosReducer,
  },
   //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
