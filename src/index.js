//React
import React from 'react';
import ReactDOM from 'react-dom';
// import AuthManager from './utils/AuthManager';
// import registerServiceWorker from './registerServiceWorker';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import { persistStore, createPersistor } from 'redux-persist'


// React Router
import { Route } from 'react-router';
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './muiTheme';

import Api from './services/api';
import App from './components/App';
// import Splash from './components/Splash';
import * as reducers from './redux';

import './styles/index.scss';


window.api = new Api();
let basename;
process.env.NODE_ENV !== 'production' ? basename = '' : basename = '/inspector';

const history = createBrowserHistory({ basename });
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);

export const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(thunk, routerMiddleware(history))
  )
)

persistStore(store, { blacklist: ['auth'] });
export const persistor = createPersistor(store, { blacklist: ['auth'] });
window.persistor = persistor;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <MuiThemeProvider muiTheme={theme}>
      <Route path='/' component={App} />
    </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)


// function getConfig() {
//   return new Promise((resolve, reject) => {
//     fetch('config.json').then(response => response.json()).then(
//       configJson => {
//         window.config = configJson;
//         resolve(configJson);
//       }
//     )
//   });
// }
//
// function authenticateUser() {
//   return new Promise((resolve, reject) => {
//     window.authManager = new AuthManager(
//       window.config.appId,
//       window.config.portalUrl,
//       window.config.jsapiUrl,
//       window.config.loginWithPopup
//     );
//     window.authManager.startup().then(() => {
//       resolve();
//     });
//   });
// }
//
// function initApp(Component) {
//   ReactDOM.render(<Component />, document.getElementById('root'));
//   registerServiceWorker();
// }
//
// initApp(Splash)
//
// getConfig()
//   .then(authenticateUser)
//   .then(initApp.bind(null, App));
