import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store';
import MoviesListApp from './component/moviesListApp/moviesListApp';


ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <MoviesListApp />
        </PersistGate>
    </Provider>,
    document.getElementById('app-container')
)

