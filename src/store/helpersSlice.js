export const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
export const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const setFulfilled = (state) => {
  state.isFetching = false;
  state.error = null;
};