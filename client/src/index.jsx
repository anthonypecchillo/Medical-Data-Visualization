import React from 'react';
import ReactDOM from 'react-dom';

import dummyData from '../dummyData.js';

import App from './components/App.jsx';

ReactDOM.render(<App dummyData={dummyData}/>, document.getElementById('app'));