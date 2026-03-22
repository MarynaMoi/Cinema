import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';
import { setFetching, setError, setFulfilled } from '../helpers';

import {
  directorsState,
  DIRECTOR_SLICE_NAME,
  createNewDirector,
} from '../../model/initialState';

const initialState = {
  directors: directorsState,
  directorItem: createNewDirector(),
  isFetching: false,
  error: null,
};

export const getDirectorsAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/getDirectorsAsync`,
  async function (__, { rejectWithValue }) {
    try {
      const response = await api.get(`/${DIRECTOR_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching directors:');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/deleteDirectorItemAsync`,
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.delete(`/${DIRECTOR_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete director:');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/updateDirectorItemAsync`,
  async function (director, { rejectWithValue }) {
    try {
      const response = await api.put(
        `/${DIRECTOR_SLICE_NAME}/${director.id}`,
        director
      );
      if (response.status >= 400) {
        throw new Error('Error updating director:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/addDirectorItemAsync`,
  async function (director, { rejectWithValue }) {
    console.log(director);
    try {
      const response = await api.post(`/${DIRECTOR_SLICE_NAME}`, director);
      if (response.status >= 400) {
        throw new Error('Error add director:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const directorsSlice = createSlice({
  name: DIRECTOR_SLICE_NAME,
  initialState,

  extraReducers: builder => {
    builder.addCase(getDirectorsAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.directors = payload;
    });
    builder.addCase(getDirectorsAsync.rejected, setError);
    builder.addCase(getDirectorsAsync.pending, setFetching);
    builder.addCase(deleteDirectorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.directors = state.directors.filter(item => item.id !== payload);
    });
    builder.addCase(deleteDirectorItemAsync.rejected, setError);
    builder.addCase(deleteDirectorItemAsync.pending, setFetching);
    builder.addCase(updateDirectorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.directors = state.directors.map(item =>
        item.id === payload.id ? payload : item
      );
    });
    builder.addCase(updateDirectorItemAsync.rejected, setError);
    builder.addCase(updateDirectorItemAsync.pending, setFetching);
    builder.addCase(addDirectorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.directors = [...state.directors, payload];
    });
    builder.addCase(addDirectorItemAsync.rejected, setError);
    builder.addCase(addDirectorItemAsync.pending, setFetching);
  },
});

const { reducer } = directorsSlice;
export default reducer;
