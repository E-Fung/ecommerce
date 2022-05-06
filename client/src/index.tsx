import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
