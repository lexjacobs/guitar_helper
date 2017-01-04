/* global require process */
require('../assets/css/font-awesome.min.css');
require('../assets/css/bootstrap.min.css');
require('../styles/main.scss');

var React = require('react');
var NavBar = require('../components/navigation/NavBar.js');
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from '../reducers/reducers.js';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Neck} from '../components/Neck/NeckContainer.jsx';

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), autoRehydrate());
} else {
  // don't bother loading redux-devtools if not in development mode
  // autoRehydrate pulls state from localStorage
  store = createStore(rootReducer, undefined, autoRehydrate());
}

// record a state of white listed reducers to localStorage
persistStore(store, {
  whitelist: ['neckState'],
  keyPrefix: 'guitar-helper:'
});

store.subscribe(() => {
  if (process.env.NODE_ENV === 'development') {
    // log each update to the store in development mode
    console.log('store update: ', store.getState());
  }
});

export const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={NavBar}>
        <IndexRedirect to="/scaleDisplay"/>
        <Route path="/scaleDisplay" component={Neck}/>
      </Route>
    </Router>
  </Provider>

);
