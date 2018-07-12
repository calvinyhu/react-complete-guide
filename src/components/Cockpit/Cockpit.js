import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const assignedClasses = []; // "red bold"
    if (props.persons.length <= 2) {
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if (props.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    let buttonClass = classes.Button;
    if (props.showPersons) {
        buttonClass = [classes.Button, classes.Red].join(' ');
    }

    return (
        <Aux>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>A paragraph</p>
            <button
                className={buttonClass}
                onClick={props.clicked} >Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </Aux>
    );
};

export default cockpit;
