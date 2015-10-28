import React from 'react';

export default React.createClass({

  getDefaultProps: function() {
    return {
      textButton: 'Add',
      animal: '',
      name: ''
    };
  },

  getInitialState: function() {
    return {
      animal: this.props.animal,
      name: this.props.name
    };
  },

  handleOnChange: function(ref, e) {
    let state = this.state;
    state[ref] = this.refs[ref].value;
    this.setState(state);
  },

  handleAddClick: function(e) {
    e.preventDefault();
    let animal = this.refs.animal.value;
    let name = this.refs.name.value;
    this.props.handler(animal, name);
    this.setState({
      animal: '',
      name: ''
    });
  },

  render: function() {
    return (
      <span>
        <input
          ref="animal"
          type="text"
          placeholder="animal"
          onChange={this.handleOnChange.bind(this, 'animal')}
          value={this.state.animal}
        />
        <input
          ref="name"
          type="text"
          placeholder="name"
          onChange={this.handleOnChange.bind(this, 'name')}
          value={this.state.name}
        />
        <button className="btn" onClick={this.handleAddClick}>{this.props.textButton}</button>
      </span>
     );
  }
});
