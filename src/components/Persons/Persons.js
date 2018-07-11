import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside constructor', props);
    this.lastPersonRef = React.createRef();
  }

  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount');
    this.lastPersonRef.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  // If a function component receives many props and you only care about a certain prop,
  // Then it may be better to convert the function component to a stateful component,
  // And implement @shouldComponentUpdate so that we only need to check that certain prop.
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState)
  //   return nextProps.persons !== this.props.persons 
  //     || nextProps.changed !== this.props.changed
  //     || nextProps.clicked !== this.props.clicked;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }

  // @render is called after @componentWillUpdate and before @componentDidUpdate
  componentDidUpdate() {
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }

  render() {
    console.log('[Persons.js] Inside render');
    return this.props.persons.map((person, index) => {
      return <Person
        name={person.name}
        age={person.age}
        click={() => this.props.clicked(index)}
        key={person.id}
        position={index}
        ref={this.lastPersonRef}
        // must have @event defined explicitly on the LHS in the anonymous function, and then passed to the @nameChangedHandler on the RHS
        changed={(event) => this.props.changed(event, person.id)} /> 
      });
  }
} 

export default Persons;
