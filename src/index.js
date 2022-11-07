import React from 'react';
import { render } from "react-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './app/App';

// 아래는 React 18용 코드인데, react-redux-firebase가 React 18을 지원안해서 17버전으로 개발하기
// const root = ReactDOM.createRoot(document.getElementById('root'));

const root = document.getElementById("root");
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
