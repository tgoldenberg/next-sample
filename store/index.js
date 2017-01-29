import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

let store = null;

export const initStore = (reducer, initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(
      reducer,
      initialState,
      applyMiddleware(thunkMiddleware),
    );
  } else {
    if (!store) {
      store = createStore(
        reducer,
        initialState,
        applyMiddleware(thunkMiddleware),
      );
    }
    return store;
  }
}
