import React, {Component} from 'react';

// ErrorBoundary is a nice tool for wrapping components where you know might fail and ytou can't do anything about it
class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: '',
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error,
        })
    }

    render() {
        if (this.state.hasError) {
            return <h1> Something went wrong</h1>;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;