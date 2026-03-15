import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../api/service';

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
const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const getActorsAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/getActorsAsync`,
  async function (__, { rejectWithValue, dispatch }) {
    try {
      const response = await api.get(`/${ACTOR_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching actors:');
      }
      const { data } = response;
      dispatch(getActors(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/deleteActorItemAsync`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`/${ACTOR_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete actor:');
      }
      dispatch(removeActor(id));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/updateActorItemAsync`,
  async function (actor, { rejectWithValue, dispatch }) {
    try {
      const response = await api.put(
        `/${ACTOR_SLICE_NAME}/${actor.id}`,
        actor
      );
      if (response.status >= 400) {
        throw new Error('Error updating actor:');
      }
      const { data } = response;
      dispatch(updateactor(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addActorItemAsync = createAsyncThunk(
  `${ACTOR_SLICE_NAME}/addActorItemAsync`,
  async function (actor, { rejectWithValue, dispatch }) {
    console.log(actor);
    try {
      const response = await api.post(`/${ACTOR_SLICE_NAME}`, actor);
      if (response.status >= 400) {
        throw new Error('Error add actor:');
      }
      dispatch(addActor(response.data));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const actorsSlice = createSlice({
  name: ACTOR_SLICE_NAME,
  initialState,
  reducers: {
    addActor (state, { payload }) {
      state.actors = [...state.actors, payload];
    },
    updateactor (state, { payload }) {
      state.actors = state.actors.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    getActors (state, { payload }) {
      state.actors = payload;
    },
    removeActor (state, { payload }) {
      state.actors = state.actors.filter(item => item.id !== payload);
    },
    // selectActor (state, { payload }) {
    //   state.actorItem = payload;
    // },

  },
  extraReducers: builder => {
    builder.addCase(getActorsAsync.rejected, setError);
    builder.addCase(getActorsAsync.pending, setFetching);
    builder.addCase(deleteActorItemAsync.rejected, setError);
    builder.addCase(deleteActorItemAsync.pending, setFetching);
    builder.addCase(updateActorItemAsync.rejected, setError);
    builder.addCase(updateActorItemAsync.pending, setFetching);
    builder.addCase(addActorItemAsync.rejected, setError);
    builder.addCase(addActorItemAsync.pending, setFetching);
  },
});

const { actions, reducer } = actorsSlice;
const { addActor, updateactor, getActors, removeActor } = actions;
// export const { selectActor, } = actions;
export default reducer;
