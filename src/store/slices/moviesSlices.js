import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';
import { setFetching, setError, setFulfilled } from '../helpersSlice';

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

export const getMoviesAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/getMoviesAsync`,
  async function (__, { rejectWithValue}) {
    try {
      const response = await api.get(`/${MOVIE_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching movies:');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/deleteMovieItemAsync`,
  async function (id, { rejectWithValue}) {
    try {
      const response = await api.delete(`/${MOVIE_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete movie:');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/updateMovieItemAsync`,
  async function (movie, { rejectWithValue}) {
    try {
      const response = await api.put(`/${MOVIE_SLICE_NAME}/${movie.id}`, movie);
      if (response.status >= 400) {
        throw new Error('Error updating movie:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addMovieItemAsync = createAsyncThunk(
  `${MOVIE_SLICE_NAME}/addMovieItemAsync`,
  async function (movie, { rejectWithValue}) {
    console.log(movie);
    try {
      const response = await api.post(`/${MOVIE_SLICE_NAME}`, movie);
      if (response.status >= 400) {
        throw new Error('Error add movie:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: MOVIE_SLICE_NAME,
  initialState,

  extraReducers: builder => {
    builder.addCase(getMoviesAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.movies = payload;
    });
    builder.addCase(getMoviesAsync.rejected, setError);
    builder.addCase(getMoviesAsync.pending, setFetching);
    builder.addCase(deleteMovieItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.movies = state.movies.filter(item => item.id !== payload);
    });
    builder.addCase(deleteMovieItemAsync.rejected, setError);
    builder.addCase(deleteMovieItemAsync.pending, setFetching);
    builder.addCase(updateMovieItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.movies = state.movies.map(item =>
        item.id === payload.id ? payload : item
      );
    });
    builder.addCase(updateMovieItemAsync.rejected, setError);
    builder.addCase(updateMovieItemAsync.pending, setFetching);
    builder.addCase(addMovieItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.movies = [...state.movies, payload];
    });
    builder.addCase(addMovieItemAsync.rejected, setError);
    builder.addCase(addMovieItemAsync.pending, setFetching);
  },
});

const { reducer } = moviesSlice;

export default reducer;
