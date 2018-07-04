import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Typically render one root component, inside root component, you nest components
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
