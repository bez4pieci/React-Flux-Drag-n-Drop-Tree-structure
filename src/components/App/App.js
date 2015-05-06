import React, { PropTypes } from 'react';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Widget from '../Widget';

var App = React.createClass({

  getInitialState() {
    return { page: AppStore.getPage() };
  },

  componentDidMount() {
    AppStore.onChange(() => {
      this.setState({ page: AppStore.getPage() });
    });
  },

  componentDidUnmount() {
    AppStore.off();
  },

  render() {
    return (
      <div className="App">
        <Widget key="page" widget={this.state.page} />
      </div>
    );
  }
});

export default App;
