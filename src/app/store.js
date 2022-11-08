import { configureStore, combineReducers } from '@reduxjs/toolkit';

import personalReducer from '../features/personal/personal_reduce';
import projectReducer from '../features/project/project_reduce';
import seminarReducer from '../features/seminar/seminar_reduce';

export const rootReducer = combineReducers({
  personalReducer,
  projectReducer,
  seminarReducer
});

const store = configureStore({
  reducer: {
    personalReducer,
    projectReducer,
    seminarReducer,
  },
});

export default store;

