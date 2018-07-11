import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Typically render one root component, inside root component, you nest components
ReactDOM.render(<App title='Relevant Persons'/>, document.getElementById('root'));
registerServiceWorker();
