import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import Dispatcher from './core/Dispatcher';
import ActionTypes from './constants/ActionTypes';
import AppStore from './stores/AppStore';
import WidgetTypes from './constants/WidgetTypes';

var server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname)));

//
// Widgets API
// -----------------------------------------------------------------------------
server.get('/api/widgets', function(req, res) {
  res.send(AppStore.getAll());
});

//
// Server-side rendering
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
var App = React.createFactory(require('./components/App'));
var templateFile = path.join(__dirname, 'templates/index.html');
var template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', function(req, res) {
  var data = {description: ''};
  var app = new App();
  data.body = React.renderToString(app);
  var html = template(data);
  res.send(html);
});

// Load widgets
(function() {
  Dispatcher.handleServerAction({
    actionType: ActionTypes.LOAD_WIDGETS,
    widgets: [
      {
        id: 1,
        type: WidgetTypes.PAGE,
        data: {},
        children: [{
          id: 2,
          type: WidgetTypes.TEXT,
          data: {
            text: 'Write a cool JS library'
          }
        },
          {
            id: 3,
            type: WidgetTypes.CONTAINER,
            data: {},
            children: [
              {
                id: 4,
                type: WidgetTypes.TEXT,
                data: {
                  text: 'Write README'
                }
              },
              {
                id: 5,
                type: WidgetTypes.CONTAINER,
                data: {},
                children: [
                  {
                    id: 6,
                    type: WidgetTypes.TEXT,
                    data: {
                      text: 'Spam in Twitter and IRC to promote it'
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 7,
            type: WidgetTypes.TEXT,
            data: {
              text: '???'
            }
          },
          {
            id: 8,
            type: WidgetTypes.TEXT,
            data: {
              text: 'PROFIT'
            }
          }
        ]
      }
    ]
  });
})();

server.listen(server.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
