import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';

import {
  moviesState,
  MOVIE_SLICE_NAME,
  createNewMovie,
} from '../../model/initialState';

const initialState = {
  movies: moviesState,
  movieItem: createNewMovie(),
  isFetching: false,
  error: null,
};
const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const getMoviesAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/getMoviesAsync`,
  async function (__, { rejectWithValue, dispatch }) {
    try {
      const response = await api.get(`/${MOVIE_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching movies:');
      }
      const { data } = response;
      dispatch(getMovies(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/deleteMovieItemAsync`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`/${MOVIE_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete movie:');
      }
      dispatch(removeMovie(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/updateMovieItemAsync`,
  async function (movie, { rejectWithValue, dispatch }) {
    try {
      const response = await api.put(`/${MOVIE_SLICE_NAME}/${movie.id}`, movie);
      if (response.status >= 400) {
        throw new Error('Error updating movie:');
      }
      const { data } = response;
      dispatch(updateMovie(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/addMovieItemAsync`,
  async function (movie, { rejectWithValue, dispatch }) {
    console.log(movie);
    try {
      const response = await api.post(`/${MOVIE_SLICE_NAME}`, movie);
      if (response.status >= 400) {
        throw new Error('Error add movie:');
      }
      dispatch(addmovie(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: MOVIE_SLICE_NAME,
  initialState,
  reducers: {
    addmovie (state, { payload }) {
      state.movies = [...state.movies, payload];
    },
    updateMovie (state, { payload }) {
      state.movies = state.movies.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    getMovies (state, { payload }) {
      state.movies = payload;
    },
    removeMovie (state, { payload }) {
      state.movies = state.movies.filter(item => item.id !== payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getMoviesAsync.rejected, setError);
    builder.addCase(getMoviesAsync.pending, setFetching);
    builder.addCase(deleteMovieItemAsync.rejected, setError);
    builder.addCase(deleteMovieItemAsync.pending, setFetching);
    builder.addCase(updateMovieItemAsync.rejected, setError);
    builder.addCase(updateMovieItemAsync.pending, setFetching);
    builder.addCase(addMovieItemAsync.rejected, setError);
    builder.addCase(addMovieItemAsync.pending, setFetching);
  },
});

const { actions, reducer } = moviesSlice;
const { addmovie, updateMovie, getMovies, removeMovie } = actions;
export default reducer;
