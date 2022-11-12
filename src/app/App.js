import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';


import Signup from '../pages/Signup';
import Login from '../pages/Login';
import About from '../pages/About';
import Activity from '../pages/Activity';
import Apply from '../pages/Apply';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

import store from './store';
import { registerAuthStateChangedObserver } from '../features/auth/auth';

const Home = lazy(() => import('../pages/Home'));

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
                <Route path='/About' element={<About />}></Route>
                <Route path='/Activity' element={<Activity />}></Route>
                <Route path='/Apply' element={<Apply />}></Route>
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
