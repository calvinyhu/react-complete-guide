import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((person, index) => {
        return <Person
          name={person.name}
          age={person.age}
          click={() => props.clicked(index)}
          key={person.id}
          // must have @event defined explicitly on the LHS in the anonymous function, and then passed to the @nameChangedHandler on the RHS
          changed={(event) => props.changed(event, person.id)} /> 
        });

export default persons;
