import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from './contexts/Theme';
import Nav from './components/Nav';
import { Router } from '@reach/router';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

const Popular = React.lazy(() => import('./containers/Popular'));
const Battle = React.lazy(() => import('./containers/Battle'));
const Results = React.lazy(() => import('./containers/Results'));

const App = () => {
  const [theme, toggleTheme] = useState('light');
  return (
    <>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <React.Suspense fallback={<Loading text="Loading" speed={300} />}>
              <Router>
                <Popular path="/" />
                <Battle path="/battle" />
                <Results path="/battle/results" />
                <NotFound default />
              </Router>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
