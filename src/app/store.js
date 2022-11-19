import { configureStore, combineReducers, getDefaultMiddleware  } from '@reduxjs/toolkit';


import loginReducer from 'features/auth/login_reducer';
import personalReducer from 'features/personal/personal_reducer';
import projectReducer from 'features/project/project_reducer';
import seminarReducer from 'features/seminar/seminar_reducer';
import newsReducer from 'features/news/news_reducer';
import darkModeReducer from 'features/dark_mode/dark_mode_reducer';
import techStackReducer from 'features/tech_stack/tech_stack_reducer';

export const rootReducer = combineReducers({
  login : loginReducer,
  personal : personalReducer,
  project: projectReducer,
  seminar: seminarReducer,
  news: newsReducer,
  darkMode: darkModeReducer,
  techStack: techStackReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;