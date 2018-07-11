import React, {Component} from 'react';
import CSSClasses from './Person.css';

// Use this function form of component as often as possible because these are very clear about what they do.
// They are simple, they don't manipulate the application.
// Most components just render.
// How do you "listen" in person, but have @App.js change state itself, without converting @Person.js into a class?
class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor', props);
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount');
    }

    render() {
        console.log('[Person.js] Inside render');
        return (
            // @style will override @className styles on behalf of regular CSS rules, not because of Radium rules
            <div className={CSSClasses.Person} >
                {/* Attributes of the object */}
                {/* This @onClick is passed a reference to a function that resides in @App.js. This is a common pattern. */}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
    
                {/* Child attributes of the object (in between open and closing tags) */}
                <p>{this.props.children}</p>
    
                {/* @value for @input tag refers to the default value of the input box */}
                <input type='text' onChange={this.props.changed} value={this.props.name} />
            </div>
        )
    }

}

export default Person;
