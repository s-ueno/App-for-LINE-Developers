import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-image-crop/dist/ReactCrop.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./locales/i18n";
import i18n from 'i18next';
import { Provider } from 'react-redux';

import App from './App';
import history from './history';
import store, { persistor } from "./AppStore";
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { Route } from 'react-router-dom';
import { Router } from "react-router";
import { QueryParamProvider } from 'use-query-params';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <QueryParamProvider ReactRouterRoute={Route}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </QueryParamProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
