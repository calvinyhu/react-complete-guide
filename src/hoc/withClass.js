import React, { Component } from 'react';

// pass on the props (key-value pairs), as is, using the spread operator
// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

// A function that returns a class on-demand
// Notice how the class does not have a name
// Use this method to access the component life cycle methods
const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default withClass;
