

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import http from 'superagent';

export default {

  //navigateTo(path, options) {
  //  if (ExecutionEnvironment.canUseDOM) {
  //    if (options && options.replace) {
  //      window.history.replaceState({}, document.title, path);
  //    } else {
  //      window.history.pushState({}, document.title, path);
  //    }
  //  }
  //
  //  Dispatcher.handleViewAction({
  //    actionType: ActionTypes.CHANGE_LOCATION,
  //    path
  //  });
  //},
  //

  loadWidgets(path, cb) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.LOAD_WIDGETS
    });

    http.get('/api/widgets')
      .accept('application/json')
      .end((err, res) => {
        Dispatcher.handleServerAction({
          actionType: ActionTypes.LOAD_WIDGETS,
          err,
          widgets: res.body
        });

        if (cb) {
          cb();
        }
      });
  }

};
