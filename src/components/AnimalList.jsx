import React from 'react';
import AnimalEdit from './AnimalEdit.jsx';

let animalsListData = [
  { id: 1, animal: 'tiger', name: 'Vee' },
  { id: 2, animal: 'lion', name: 'Simba' },
  { id: 3, animal: 'dog', name: 'Buck' },
  { id: 4, animal: 'sealion', name: 'Seel' }
];


export default React.createClass({
  getInitialState: function() {
    return {
      animals: [],
      editing: null
    };
  },

  componentDidMount: function() {
    this._fetchRemoteData();
  },

  handleCancelEdit: function(e) {
    this.setState({editing: null});
  },

  handleResetClick: function(e) {
    this.setState({
      animals: []
    });
  },

  handleFetchClick: function(e) {
    this._fetchRemoteData();
  },

  _fetchRemoteData: function() {
    setTimeout(function() {
      this.setState({
        animals: animalsListData
      });
    }.bind(this), 2000);
  },

  handleRemoveAnimal: function(id, e){
    if (this.state.editing !== null){return;}
    let newListAnimals = this.state.animals.filter( animal => animal.id !== id );
    this.setState({ animals: newListAnimals });
  },

  handleEditAnimal: function(id, e){
    if (this.state.editing !== null){return;}
    this.setState({editing: id});
  },

  handleModifyAnimal: function(animal, name) {
    let editing = this.state.editing;
    let newListAnimals = this.state.animals.map( a => {
    return editing !== a.id ? a : {id: a.id, animal: animal, name: name};});
    this.setState({animals: newListAnimals, editing: null});
  },

  addAnimal: function(animal, name) {
    let animals = this.state.animals;
    let id = Math.random().toString(36).slice(2);
    animals.push({
      id: id,
      animal: animal,
      name: name
    });
    this.setState({
      animals: animals
    });
  },

  render: function() {
    let addAnimal = '',
        resetBtn = '';

    if (this.state.editing === null){
      addAnimal = <AnimalEdit handler={this.addAnimal}/>;
      resetBtn = <button className="btn btn-error btn-center" onClick={this.handleResetClick}>Reset</button>;
    }

    if (!this.state.animals.length) {
      return (
        <div>
          <p>No animals!</p>
          <button className="btn btn-center btn-main" onClick={this.handleFetchClick}>Fetch</button>
          {addAnimal}
        </div>
      );
    }

    return (
      <div>
        <ul>
          {
            this.state.animals.map((animal, index) => {
              if (this.state.editing === animal.id){
                return (
                  <span key={index}>
                    <AnimalEdit animal={animal.animal} name={animal.name} handler={this.handleModifyAnimal} textButton="Modify"/>
                    <button onClick={this.handleCancelEdit} className='btn btn-warn'>Cancel</button>
                  </span>
                );
              }
              return (
                <li key={index}>
                  <span onDoubleClick={ this.handleEditAnimal.bind(this, animal.id)}>{animal.name} the { animal.animal }!</span>
                  <button className="btn btn-error" onClick={ this.handleRemoveAnimal.bind(this, animal.id)}>X</button>
                </li>
              );
            })
          }
        </ul>
        {addAnimal}
        {resetBtn}
      </div>
    );
  }
});
