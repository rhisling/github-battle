import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './containers/Popular';
import Battle from './containers/Battle';

const App = () => (
  <div>
    <Battle />
    {/* <Popular /> */}
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
