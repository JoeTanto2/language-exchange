import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import { setUserFromLocalStorage } from './features/userSlice';

import './styles/main.scss';

store.dispatch(setUserFromLocalStorage());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
