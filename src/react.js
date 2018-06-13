import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import MoviesListApp from './component/moviesListApp/moviesListApp';


ReactDOM.render(
    <Provider store={store}>
        <MoviesListApp />
    </Provider>,
    document.getElementById('app-container')
)

