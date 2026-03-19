import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';

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
const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const getDirectorsAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/getDirectorsAsync`,
  async function (__, { rejectWithValue, dispatch }) {
    try {
      const response = await api.get(`/${DIRECTOR_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching directors:');
      }
      const { data } = response;
      dispatch(getdirectors(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/deleteDirectorItemAsync`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`/${DIRECTOR_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete director:');
      }
      dispatch(removedirector(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/updateDirectorItemAsync`,
  async function (director, { rejectWithValue, dispatch }) {
    try {
      const response = await api.put(`/${DIRECTOR_SLICE_NAME}/${director.id}`, director);
      if (response.status >= 400) {
        throw new Error('Error updating director:');
      }
      const { data } = response;
      dispatch(updatedirector(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addDirectorItemAsync = createAsyncThunk(
  `${DIRECTOR_SLICE_NAME}/addDirectorItemAsync`,
  async function (director, { rejectWithValue, dispatch }) {
    console.log(director);
    try {
      const response = await api.post(`/${DIRECTOR_SLICE_NAME}`, director);
      if (response.status >= 400) {
        throw new Error('Error add director:');
      }
      dispatch(adddirector(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const directorsSlice = createSlice({
  name: DIRECTOR_SLICE_NAME,
  initialState,
  reducers: {
    adddirector (state, { payload }) {
      state.directors = [...state.directors, payload];
    },
    updatedirector (state, { payload }) {
      state.directors = state.directors.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    getdirectors (state, { payload }) {
      state.directors = payload;
    },
    removedirector (state, { payload }) {
      state.directors = state.directors.filter(item => item.id !== payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getDirectorsAsync.rejected, setError);
    builder.addCase(getDirectorsAsync.pending, setFetching);
    builder.addCase(deleteDirectorItemAsync.rejected, setError);
    builder.addCase(deleteDirectorItemAsync.pending, setFetching);
    builder.addCase(updateDirectorItemAsync.rejected, setError);
    builder.addCase(updateDirectorItemAsync.pending, setFetching);
    builder.addCase(addDirectorItemAsync.rejected, setError);
    builder.addCase(addDirectorItemAsync.pending, setFetching);
  },
});

const { actions, reducer } = directorsSlice;
const { adddirector, updatedirector, getdirectors, removedirector } = actions;
export default reducer;
