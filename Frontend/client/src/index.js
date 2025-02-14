import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToggleThemeProvider } from '../src/Components/header/ThemeSwitcher';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToggleThemeProvider><App /></ToggleThemeProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <ToggleThemeProvider>
//     <App />
//   </ToggleThemeProvider>,
//   document.getElementById('root')
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
