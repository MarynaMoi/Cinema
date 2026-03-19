import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';

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
const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const getStudiosAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/getStudiosAsync`,
  async function (__, { rejectWithValue, dispatch }) {
    try {
      const response = await api.get(`/${STUDIO_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching studios:');
      }
      const { data } = response;
      dispatch(getStudios(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/deleteStudioItemAsync`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`/${STUDIO_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete studio:');
      }
      dispatch(removeStudio(id));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/updateStudioItemAsync`,
  async function (studio, { rejectWithValue, dispatch }) {
    try {
      const response = await api.put(
        `/${STUDIO_SLICE_NAME}/${studio.id}`,
        studio
      );
      if (response.status >= 400) {
        throw new Error('Error updating studio:');
      }
      const { data } = response;
      dispatch(updateStudio(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addStudioItemAsync = createAsyncThunk(
  `${STUDIO_SLICE_NAME}/addStudioItemAsync`,
  async function (studio, { rejectWithValue, dispatch }) {
    console.log(studio);
    try {
      const response = await api.post(`/${STUDIO_SLICE_NAME}`, studio);
      if (response.status >= 400) {
        throw new Error('Error add studio:');
      }
      dispatch(addStudio(response.data));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studiosSlice = createSlice({
  name: STUDIO_SLICE_NAME,
  initialState,
  reducers: {
    addStudio (state, { payload }) {
      state.studios = [...state.studios, payload];
    },
    updateStudio (state, { payload }) {
      state.studios = state.studios.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    getStudios (state, { payload }) {
      state.studios = payload;
    },
    removeStudio (state, { payload }) {
      state.studios = state.studios.filter(item => item.id !== payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getStudiosAsync.rejected, setError);
    builder.addCase(getStudiosAsync.pending, setFetching);
    builder.addCase(deleteStudioItemAsync.rejected, setError);
    builder.addCase(deleteStudioItemAsync.pending, setFetching);
    builder.addCase(updateStudioItemAsync.rejected, setError);
    builder.addCase(updateStudioItemAsync.pending, setFetching);
    builder.addCase(addStudioItemAsync.rejected, setError);
    builder.addCase(addStudioItemAsync.pending, setFetching);
  },
});

const { actions, reducer } = studiosSlice;
const { addStudio, updateStudio, getStudios, removeStudio } = actions;
export default reducer;
