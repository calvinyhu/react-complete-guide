import React, { Component } from 'react';
// Thanks to webpack, we can "import" css files in js files
import CSSClasses from './App.css'; // imports App, red, and bold
import Person from '../components/Persons/Person/Person';

// React will update state if either @state is changed OR @props are changed.
// @App is considered a container because it contains some state.
class App extends Component {
  // @state is only available in stateful components, or components that use @Component.
  // Use functional over stateful components whenever possible for best practice.
  // If @state changes, React will re-render the necessary components and potentially update the DOM in the browser
  // By adding @id to each person object, React will be more efficient in finding and deleting a person from the list
  state = {
    persons: [
      { id: 'a', name: 'Calvin', age: 22 },
      { id: 'b', name: 'Kevin', age: 23 },
      { id: 'c', name: 'Bob', age: 24 },
    ],
    otherState: 'Some other value',
    showPersons: false,
  }

  // // switchName can be whatever, but Handler is good convention!
  // switchNameHandler = (newName) => {
  //   // Don't do this to change state, React won't recognize it.
  //   // this.state.persons[0].name = 'Calvin Hu';

  //   // Using this correct way, React will only change state of the elements that are changed.
  //   // In other words, @otherState will NOT be touched, only @persons will be.
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 24 },
  //       { name: 'Kevin Fang', age: 25 },
  //       { name: 'Bob Ross', age: 26 },
  //     ],
  //   })
  // }

  // The below function will have problems with using this.
  // The function assigned to the name as a property above will not have this problem.
  // switchNameHander() {
    // this.propertyNameHere
  // }

  nameChangeHandler = (event, id) => {
    // @personIndex will hold the index of the person in the state where p.id equals id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Create a copy of the found person object
    const person = {...this.state.persons[personIndex]};
    // update the person with the new value
    person.name = event.target.value;

    // Alternative way (not as modern)
    // const person = Object.assign({}, this.state.persons[personIndex]);

    // copy of all persons
    const persons = [...this.state.persons];
    // update the persons array with the new person that was updated
    persons[personIndex] = person;

    // set state with mutated copy
    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    // Arrays and objects are reference types, so we are only change the element @persons is pointing to
    // const persons = this.state.persons.slice();
    // Below line of code is bad practice because we are mutating the underlying @persons in @state of App.js
    // A good practice is creating a copy using the @slice function (as shown above)
    // An alternative way is to use the spread (...) operator which is the more modern way (as shown above)
    // In general, you should always update state in an IMMUTABLE way. In other words, you should not mutate the original state first before the update.
    // Create a copy, and change that, then set state.
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {
    // // Styling hovering effect is pretty hard using inline styles
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   // :hover is a Radium feature (npm install --save radium) in project root folder
    //   // ':hover': {
    //   //   backgroundColor: 'lightgreen',
    //   //   color: 'black',
    //   // },
    // };

    let persons = null;
    let buttonClass = '';

    // Below is common way to show lists in React using map
    // @index is an automatically passed in argument in the @map function
    // @index is not a good key because if a new person is added then the index for all subsequent persons will change
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(index)}
              key={person.id}
              // must have @event defined explicitly on the LHS in the anonymous function, and then passed to the @nameChangedHandler on the RHS
              changed={(event) => this.nameChangeHandler(event, person.id)} /> 
          })}
        </div>
      );

      buttonClass = CSSClasses.Red;
    }

    const pclasses = []; // "red bold"
    if (this.state.persons.length <= 2) {
      pclasses.push( CSSClasses.red ); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      pclasses.push( CSSClasses.bold ); // classes = ['red', 'bold']
    }
    
    // This is NOT "HTML", this is JSX. It is syntactic sugar, and compiles down to JavaScript.
    // React is not using the real @div and @h1 tags, it handles these behind the scenes.
    // Best practice to wrap everything into one root div element
    // Must wrap entire app in @<StyleRoot> if using advanced features like media queries
    // CSSClasses.App is a unique className generated by css-loader (BTS)
    return (
      <div className={CSSClasses.App}>
        <h1>Hi, Calvin!</h1>
        <p className={pclasses.join(' ')}>A paragraph</p>
        {/* Do not type "this.switchNameHandler()", React will call the function immediately on render */}
        {/* For arrow functions, an implicit @return is added after the arrow */}
        {/* We are passing an anonymous function for @onClick */}
        {/* Use @bind more often, since anonymouse function can be inefficient. */}
        <button
          className={buttonClass}
          onClick={this.togglePersonsHandler} >Toggle Persons</button>
        {persons}
      </div>
    );
    // JSX code above compiles to this line below.
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, Calvin!'));
  }
}

// ES6 feature
export default App;
