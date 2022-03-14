import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
