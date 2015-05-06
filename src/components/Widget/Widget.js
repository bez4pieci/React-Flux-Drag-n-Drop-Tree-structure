import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import WidgetTypes from '../../constants/WidgetTypes'; // eslint-disable-line no-unused-vars
import { DragDropMixin } from 'react-dnd';

import ActionTypes from '../../constants/ActionTypes';
import Dispatcher from '../../core/Dispatcher';

const dragSource = {
  beginDrag(component) {
    return {
      item: {
        id: component.props.id
      }
    };
  }
};

const dropTarget = {
  over(component, item) {
    //console.log('over', component);
    Dispatcher.handleViewAction({
      actionType: ActionTypes.HILIGHT,
      targetId: component.props.widget.id
    });
  },
  leave(component, item) {
    //console.log('leave', component);
    Dispatcher.handleViewAction({
      actionType: ActionTypes.UNHILIGHT,
      targetId: component.props.widget.id
    });
  }
};

var Widget = React.createClass({

  mixins: [DragDropMixin],

  propTypes: {
    widget: PropTypes.object
  },

  statics: {
    configureDragDrop(register) {
      register('widget', {
        dragSource,
        dropTarget
      });
    }
  },

  render() {
    let widget = this.props.widget;
    if(!widget) {
      return <div>loading...</div>;
    }

    let childWidgets = '';
    if(widget.children) {
      childWidgets = widget.children.map(child => {
        return <Widget key={child.id} widget={child} />;
      });
    }

    return (
      <div {...this.dragSourceFor('widget')}
           {...this.dropTargetFor('widget')}
           className={'Widget Widget--' + widget.type + (widget.hilighted ? ' Widget--hilighted' : '')}>
        {widget.data.text}
        {childWidgets}
      </div>
    );
  }

});

export default Widget;
