import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { use100vh } from 'react-div-100vh';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import ReactGA from 'react-ga';

import { AppProvider } from './contexts/AppContext';
import Loader from './components/Loader';
import styles from './App.module.css';

const Home = lazy(() => import('./routes/home'));
const Book = lazy(() => import('./routes/book'));
const Config = lazy(() => import('./routes/config'));

const APP_PADDING = window.innerWidth > 500 ? 24 * 2 : 0;

ReactGA.initialize('UA-193662890-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function Fallback() {
    return (
        <div className="wrapper">
            <div className={styles.pageWrapper}>
                <Loader />
            </div>
        </div>
    );
}

const App = () => {
    const height = use100vh();
    return (
        <div id="app" style={{ height: height - APP_PADDING }}>
            <ScopedCssBaseline />
            <Suspense fallback={<Fallback />}>
                <AppProvider>
                    <Router>
                        <Route path="/config" component={Config} />
                        <Route path="/book" component={Book} />
                        <Route exact path="/" component={Home} />
                    </Router>
                </AppProvider>
            </Suspense>
        </div>
    );
};

export default App;
