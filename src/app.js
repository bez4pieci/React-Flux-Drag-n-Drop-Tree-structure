

import 'babel/polyfill';

import React from 'react/addons';
import FastClick from 'fastclick';
import emptyFunction from 'react/lib/emptyFunction';
import App from './components/App';
import Dispatcher from './core/Dispatcher';
import AppActions from './actions/AppActions';
import ActionTypes from './constants/ActionTypes';

function run() {
  // Render the top-level React component
  let element = React.createElement(App);
  React.render(element, document.body);

  AppActions.loadWidgets();

  // Update `Application.path` prop when `window.location` is changed
  //Dispatcher.register((payload) => {
  //  if (payload.action.actionType === ActionTypes.CHANGE_LOCATION) {
  //    element = React.cloneElement(element);
  //    React.render(element, document.body);
  //  }
  //});
}

window.addEventListener('DOMContentLoaded', run);

// Run the application when both DOM is ready
// and page content is loaded
//Promise.all([
//  new Promise((resolve) => {
//    if (window.addEventListener) {
//      window.addEventListener('DOMContentLoaded', resolve);
//    } else {
//      window.attachEvent('onload', resolve);
//    }
//  }).then(() => FastClick.attach(document.body))
//  //new Promise((resolve) => AppActions.loadPage(path, resolve))
//]).then(run);
