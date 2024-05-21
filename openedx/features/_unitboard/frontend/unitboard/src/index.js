/* globals contextData */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './global.css';
import store from "./unitboardApp/state/setupStore";
import Context from "./unitboardApp/core/context";
import App from "./unitboardApp";
import { SnackbarProvider } from 'notistack';


ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <React.StrictMode>
        <Context contextData={contextData} />
        <App />
      </React.StrictMode>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('unitboard'),
);

