import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SessionAction from './actions/SessionAction';
import { BrowserRouter } from 'react-router-dom';

window.handleGoogleApiLoaded = () => {
    SessionAction.authorize(true, renderApp);
  };

function renderApp(){
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root'));
}

