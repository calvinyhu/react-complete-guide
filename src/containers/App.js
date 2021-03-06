import React, { PureComponent } from 'react';
// Thanks to webpack, we can "import" css files in js files
import classes from './App.css'; // imports App, red, and bold
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

// React will update state if either @state is changed OR @props are changed.
// @App is considered a container because it contains some state.
// Only use PureComponent if you know updates may not be required
// OR you know that some props update a component and not all.
class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside constructor', props);
    // @state is only available in stateful components, or components that use @Component.
    // Use functional over stateful components whenever possible for best practice.
    // If @state changes, React will re-render the necessary components and potentially update the DOM in the browser
    // By adding @id to each person object, React will be more efficient in finding and deleting a person from the list
    this.state = {
      persons: [
        { id: 'a', name: 'Calvin', age: 22 },
        { id: 'b', name: 'Kevin', age: 23 },
        { id: 'c', name: 'Bob', age: 24 },
      ],
      otherState: 'Some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false,
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  // Remove @shouldComponentUpdate in PureComponents!
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState)
  //   return nextState.persons !== this.state.persons
  //     || nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);
    return prevState;
  }

  // This function is a great spot to save the scrolling position of the user
  getSnapshotBeforeUpdate() {
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');
  }

  // @render is called after @componentWillUpdate and before @componentDidUpdate
  // This function is a great place to set the new scrolling position
  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  nameChangeHandler = (event, id) => {
    // @personIndex will hold the index of the person in the state where p.id equals id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Create a copy of the found person object
    const person = {...this.state.persons[personIndex]};
    // update the person with the new value
    person.name = event.target.value;

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
    // Should not call @this.state inside of @this.setState because this function runs asynchronously
    // Meaning if @this.setState is called twice by two different users, then the @this.state.value may not be the value as expected.
    // Use the below @prevState arrow function within @this.setState to access the @prevState, safely.
    const showPersons = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !showPersons,
        toggleClicked: prevState.toggleClicked + 1,
      }
    })
  }

  loginHandler = () => {
    this.setState({
      authenticated: true,
    })
  }

  render() {
    console.log('[App.js] Inside render');
    let persons = null;

    // Below is common way to show lists in React using map
    // @index is an automatically passed in argument in the @map function
    // @index is not a good key because if a new person is added then the index for all subsequent persons will change
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />
      );
    }
    
    // This is NOT "HTML", this is JSX. It is syntactic sugar, and compiles down to JavaScript.
    // React is not using the real @div and @h1 tags, it handles these behind the scenes.
    // Best practice to wrap everything into one root div element
    // Must wrap entire app in @<StyleRoot> if using advanced features like media queries
    // classes.App is a unique className generated by css-loader (BTS)
    return (
      <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
