import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';

import { setFetching, setError, setFulfilled } from '../helpersSlice';
import {
  actorsState,
  ACTOR_SLICE_NAME,
  createNewActor,
} from '../../model/initialState';

const initialState = {
  actors: actorsState,
  actorItem: createNewActor(),
  isFetching: false,
  error: null,
};

export const getActorsAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/getActorsAsync`,
  async function (__, { rejectWithValue }) {
    try {
      const response = await api.get(`/${ACTOR_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching actors:');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/deleteActorItemAsync`,
  async function (id, { rejectWithValue }) {
    try {
      const response = await api.delete(`/${ACTOR_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete actor:');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/updateActorItemAsync`,
  async function (actor, { rejectWithValue }) {
    try {
      const response = await api.put(`/${ACTOR_SLICE_NAME}/${actor.id}`, actor);
      if (response.status >= 400) {
        throw new Error('Error updating actor:');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/addActorItemAsync`,
  async function (actor, { rejectWithValue }) {
    console.log(actor);
    try {
      const response = await api.post(`/${ACTOR_SLICE_NAME}`, actor);
      if (response.status >= 400) {
        throw new Error('Error add actor:');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const actorsSlice = createSlice({
  name: ACTOR_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getActorsAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.actors = payload;
    });
    builder.addCase(getActorsAsync.rejected, setError);
    builder.addCase(getActorsAsync.pending, setFetching);
    builder.addCase(deleteActorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.actors = state.actors.filter(item => item.id !== payload);
    });
    builder.addCase(deleteActorItemAsync.rejected, setError);
    builder.addCase(deleteActorItemAsync.pending, setFetching);
    builder.addCase(updateActorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.actors = state.actors.map(item =>
        item.id === payload.id ? payload : item
      );
    });
    builder.addCase(updateActorItemAsync.rejected, setError);
    builder.addCase(updateActorItemAsync.pending, setFetching);
    builder.addCase(addActorItemAsync.fulfilled, (state, { payload }) => {
      setFulfilled(state);
      state.actors = [...state.actors, payload];
    });
    builder.addCase(addActorItemAsync.rejected, setError);
    builder.addCase(addActorItemAsync.pending, setFetching);
  },
});

const { reducer } = actorsSlice;
export default reducer;
