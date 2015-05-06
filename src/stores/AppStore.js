import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PayloadSources from '../constants/PayloadSources';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

var CHANGE_EVENT = 'change';

var widgets = [];
var loading = false;


function findWidgetById(id, parent = null) {
  if (parent === null) {
    parent = widgets[0];
  }

  if (!parent.children) {
    return false;
  }

  for (var i = 0; i < parent.children.length; i++) {
    let child = parent.children[i];
    if (child.id === id) {
      return {widget: child, parent: parent, index: parent.children.indexOf(child)};
    }

    let found = findWidgetById(id, child);
    if (found) {
      return found;
    }
  }

  return false;
}


var AppStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  off() {
    this.removeAllListeners(CHANGE_EVENT);
  },

  getAll() {
    return widgets;
  },

  getPage() {
    return widgets[0] || null;
  },

  hilight(targetId) {
    const target = findWidgetById(targetId);
    if(!target) return;
    target.widget.hilighted = true;
    this.emitChange();
  },

  unhilight(targetId) {
    const target = findWidgetById(targetId);
    if(!target) return;
    target.widget.hilighted = false;
    this.emitChange();
  },

  move(sourceId, targetId, position = 'after') {
    const source = findWidgetById(sourceId);
    const target = findWidgetById(targetId);

    source.parent.children.splice(source.index, 1);
    target.parent.children.splice(target.index, 0, source.widget);

    this.emitChange();
  }

});


AppStore.dispatcherToken = Dispatcher.register((payload) => {
  var action = payload.action;

  switch (action.actionType) {

    case ActionTypes.LOAD_WIDGETS:
      if (payload.source === PayloadSources.VIEW_ACTION) {
        loading = true;

      } else {
        loading = false;
        if (!action.err) {
          widgets[0] = action.widgets[0];
          AppStore.emitChange();
        }
      }
      break;

    case ActionTypes.MOVE:
      AppStore.move(action.sourceId, action.targetId);
      break;

    case ActionTypes.HILIGHT:
      AppStore.hilight(action.targetId);
      break;

    case ActionTypes.UNHILIGHT:
      AppStore.unhilight(action.targetId);
      break;


    default:
    // Do nothing

  }

});

export default AppStore;
