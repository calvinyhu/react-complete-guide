import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

// React will update state if either @state is changed OR @props are changed.
// @App is considered a container because it contains some state.
class App extends Component {
  // @state is only available in stateful components, or components that use @Component.
  // Use functional over stateful components whenever possible for best practice.
  // If @state changes, React will re-render the necessary components and potentially update the DOM in the browser
  state = {
    persons: [
      { name: 'Calvin', age: 22 },
      { name: 'Kevin', age: 23 },
      { name: 'Bob', age: 24 },
    ],
    otherState: 'Some other value',
  }

  // switchName can be whatever, but Handler is good convention!
  switchNameHandler = (newName) => {
    // Don't do this to change state, React won't recognize it.
    // this.state.persons[0].name = 'Calvin Hu';

    // Using this correct way, React will only change state of the elements that are changed.
    // In other words, @otherState will NOT be touched, only @persons will be.
    this.setState({
      persons: [
        { name: newName, age: 24 },
        { name: 'Kevin Fang', age: 25 },
        { name: 'Bob Ross', age: 26 },
      ],
    })
  }

  // The below function will have problems with using this.
  // The function assigned to the name as a property above will not have this problem.
  // switchNameHander() {
    // this.propertyNameHere
  // }

  nameChangeHandler = (event) => {
    // @event.target refers to @input (input.value)
    this.setState({
      persons: [
        { name: 'Calvin Hu', age: 24 },
        { name: event.target.value, age: 25 },
        { name: 'Bob Ross', age: 26 },
      ],
    })
  }

  render() {
    // This is NOT "HTML", this is JSX. It is syntactic sugar, and compiles down to JavaScript.
    // React is not using the real @div and @h1 tags, it handles these behind the scenes.
    return (
      <div className="App">
        <h1>Hi, Calvin!</h1>
        <p>A paragraph</p>
        {/* Do not type "this.switchNameHandler()", React will call the function immediately on render */}
        {/* For arrow functions, an implicit @return is added after the arrow */}
        {/* We are passing an anonymous function for @onClick */}
        {/* Use @bind more often, since anonymouse function can be inefficient. */}
        <button onClick={() => this.switchNameHandler('Calvin Hu was binded once!')} >Switch Name</button>
        <Person 
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          // Here, we pass a reference to @switchNameHandler to @Person.
          // @bind will control what the @this inside @switchNameHandler will refer to.
          click={this.switchNameHandler.bind(this, 'Calvin Hu was binded twice!')}
          changed={this.nameChangeHandler} >My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
      // Best practice to wrap everything into one root div element
      // <h1>Another heading</h1>
    );
    // JSX code above compiles to this line below.
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, Calvin!'));
  }
}

// ES6 feature
export default App;
