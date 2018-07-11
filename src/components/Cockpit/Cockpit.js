import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const assignedClasses = []; // "red bold"
    if (props.persons.length <= 2) {
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if (props.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    let buttonClass = '';
    if (props.showPersons) {
        buttonClass = classes.Red;
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, Calvin!</h1>
            <p className={assignedClasses.join(' ')}>A paragraph</p>
            <button
                className={buttonClass}
                onClick={props.clicked} >Toggle Persons</button>
        </div>
    );
};

export default cockpit;
