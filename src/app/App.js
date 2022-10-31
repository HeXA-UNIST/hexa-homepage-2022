import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import About from '../pages/About';
import Activity from '../pages/Activity';
import Apply from '../pages/Apply';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <div className="App">
      <header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Activity' element={<Activity/>}></Route>
          <Route path='/Apply' element={<Apply/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
