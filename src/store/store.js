import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';


const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  movie: moviesReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export const store = setupStore();

