import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';
import { setFetching, setError, setFulfilled } from '../helpers';

import {
  studiosState,
  STUDIO_SLICE_NAME,
  createNewStudio,
} from '../../model/initialState';

const initialState = {
  studios: studiosState,
  studioItem: createNewStudio(),
  isFetching: false,
  error: null,
};

export const getStudiosAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/getStudiosAsync`,
  async function (__, { rejectWithValue}) {
    try {
      const response = await api.get(`/${STUDIO_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching studios:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/deleteStudioItemAsync`,
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.delete(`/${STUDIO_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete studio:');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/updateStudioItemAsync`,
  async function (studio, { rejectWithValue}) {
    try {
      const response = await api.put(
        `/${STUDIO_SLICE_NAME}/${studio.id}`,
        studio
      );
      if (response.status >= 400) {
        throw new Error('Error updating studio:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/addStudioItemAsync`,
  async function (studio, { rejectWithValue }) {
    console.log(studio);
    try {
      const response = await api.post(`/${STUDIO_SLICE_NAME}`, studio);
      if (response.status >= 400) {
        throw new Error('Error add studio:');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studiosSlice = createSlice({
  name: STUDIO_SLICE_NAME,
  initialState,

  extraReducers: builder => {
    builder.addCase(getStudiosAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.studios = payload;
    });
    builder.addCase(getStudiosAsync.rejected, setError);
    builder.addCase(getStudiosAsync.pending, setFetching);
    builder.addCase(deleteStudioItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.studios = state.studios.filter(item => item.id !== payload);
    });
    builder.addCase(deleteStudioItemAsync.rejected, setError);
    builder.addCase(deleteStudioItemAsync.pending, setFetching);
    builder.addCase(updateStudioItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.studios = state.studios.map(item =>
        item.id === payload.id ? payload : item
      );
    });
    builder.addCase(updateStudioItemAsync.rejected, setError);
    builder.addCase(updateStudioItemAsync.pending, setFetching);
    builder.addCase(addStudioItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.studios = [...state.studios, payload];
    });
    builder.addCase(addStudioItemAsync.rejected, setError);
    builder.addCase(addStudioItemAsync.pending, setFetching);
  },
});

const { reducer } = studiosSlice;
export default reducer;
