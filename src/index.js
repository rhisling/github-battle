import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './containers/Popular';
import Battle from './containers/Battle';
import { ThemeProvider } from './contexts/Theme';
import Nav from './components/Nav';
import { Router } from '@reach/router';

const App = () => {
  const [theme, toggleTheme] = useState('light');
  return (
    <>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <Router>
              <Popular path="/" />
              <Battle path="/battle" />
            </Router>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
