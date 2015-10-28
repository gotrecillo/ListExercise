import React from 'react';
import AnimalEdit from './AnimalEdit.jsx';
import AnimalList from './AnimalList.jsx';

export default React.createClass({
  getInitialState: function() {
    return {count: 0};
  },

  _handleOnClick: function() {
    console.log('caca');
    this.setState({
      count: this.state.count + 1
    }).bind(this);
  },

  render: function() {
    return <AnimalList />;
  }
});
