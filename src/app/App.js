import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import About from '../pages/About';
import Activity from '../pages/Activity';
import Apply from '../pages/Apply';
import NotFound from '../pages/NotFound';
import UploadProject from 'pages/UploadProject';

import SeminarReducerTestScreen from '../features/seminar/test';
import ProjectReducerTestScreen from '../features/project/test';

import store from './store';
import { registerAuthStateChangedObserver } from '../features/auth/auth';


import UploadSeminar from 'pages/UploadSeminar';
const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../pages/Signup'));
const Login = lazy(()=> import('../pages/Login'));
const Profile = lazy(()=> import('../pages/Profile'));
const EditProfile = lazy(()=> import('../pages/EditProfile'));
const Project = lazy(()=> import('../pages/Project'));

const RegisterFirebaseObserverComponent = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(registerAuthStateChangedObserver);
  }, []);
  return props.children;
}


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header />
        <Suspense>
          <RegisterFirebaseObserverComponent>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/Home' element={<Home />}></Route>
                <Route path='/Signup' element={<Signup />}></Route>
                <Route path='/Login' element={<Login />}></Route>
                <Route path='/Profile' element={<Profile />}></Route>
                <Route path='/EditProfile' element={<EditProfile />}></Route>
                <Route path='/About' element={<About />}></Route>
                <Route path='/Activity' element={<Activity />}></Route>
                <Route path='/Apply' element={<Apply />}></Route>
                <Route path='/Project' element={<Project />}></Route>
                <Route path='/test/seminar' element={<SeminarReducerTestScreen />}></Route>
                <Route path='/test/project' element={<ProjectReducerTestScreen />}></Route>
                <Route path='/UploadProject' element={<UploadProject />}></Route>
                <Route path='/uploadSeminar' element={<UploadSeminar />}></Route>
                <Route path='*' element={<NotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </RegisterFirebaseObserverComponent>

        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
