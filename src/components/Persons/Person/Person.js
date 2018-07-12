import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import {AuthContext} from '../../../containers/App';

// Use this function form of component as often as possible because these are very clear about what they do.
// They are simple, they don't manipulate the application.
// Most components just render.
// How do you "listen" in person, but have @App.js change state itself, without converting @Person.js into a class?
class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor', props);
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount');
        // Don't do this below for styling or display
        // Only use the below way for focus and media playback
        if (this.props.position === 0)
            this.inputElement.current.focus();
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[Person.js] Inside render');
        return (
            // @style will override @className styles on behalf of regular CSS rules, not because of Radium rules
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>

                {/* Attributes of the object */}
                {/* This @onClick is passed a reference to a function that resides in @App.js. This is a common pattern. */}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
    
                {/* Child attributes of the object (in between open and closing tags) */}
                <p>{this.props.children}</p>
    
                {/* @value for @input tag refers to the default value of the input box */}
                <input
                    // ref is only available in stateful components
                    ref={this.inputElement}
                    type='text'
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
