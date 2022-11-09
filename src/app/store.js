import { configureStore, combineReducers } from '@reduxjs/toolkit';

import loginReducer from '../features/auth/login_reducer';
import personalReducer from '../features/personal/personal_reducer';
import projectReducer from '../features/project/project_reducer';
import seminarReducer from '../features/seminar/seminar_reducer';
import newsReducer from '../features/news/news_reducer';
import techStackReducer from '../features/tech_stack/tech_stack_reducer';


export const rootReducer = combineReducers({
  loginReducer,
  personalReducer,
  projectReducer,
  seminarReducer,
  newsReducer,
  techStackReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export default store;