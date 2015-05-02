import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import WidgetTypes from '../../constants/WidgetTypes'; // eslint-disable-line no-unused-vars

class Widget {

  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    children: PropTypes.array
  };

  render() {
    let childWidgets = '';
    if(this.props.children) {
      childWidgets = this.props.children.map((child, index) => {
        return <Widget key={index} {...child} />;
      });
    }

    return (
      <div className={'Widget Widget--' + this.props.type}>
        {this.props.data.text}
        {childWidgets}
      </div>
    );
  }

}

export default Widget;
