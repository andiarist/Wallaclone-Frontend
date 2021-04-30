import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './config/i18n';
import storage from './utils/storage';
import { configureClient, setLocaleLanguageHeader } from './api/client';

import App, { Root } from './components/App';
import './index.css';
import configureStore from './store';

const auth = storage.get('auth') || {
  tokenJWT: null,
  userEmail: null,
  username: null,
  _id: null,
};

configureClient(auth.tokenJWT);
setLocaleLanguageHeader('es');

const preloadedState = {
  auth: {
    isLogged: !!auth.tokenJWT,
    currentUsername: auth.username,
    currentEmail: auth.userEmail,
    currentUserId: auth._id,
  },
};
const history = createBrowserHistory();

const store = configureStore(preloadedState, { history });

const render = () => {
  ReactDOM.render(
    <Suspense fallback="Cargando...">
      <Root store={store} history={history}>
        <App />
      </Root>
    </Suspense>,
    document.getElementById('root'),
  );
};

render();
