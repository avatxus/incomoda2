import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { use100vh } from 'react-div-100vh';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import { AppProvider } from './contexts/AppContext';
import { session } from './lib/storage';
import A2HS from './components/a2hs';
import Loader from './components/Loader';
import styles from './App.module.css';

const Home = lazy(() => import('./routes/home'));
const Book = lazy(() => import('./routes/book'));
const Config = lazy(() => import('./routes/config'));
const Legal = lazy(() => import('./routes/legal'));

const APP_PADDING = window.innerWidth > 500 ? 24 * 2 : 0;

function Fallback() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.pageWrapper}>
                <Loader />
            </div>
        </div>
    );
}

function needsToSeePrompt() {
    // if already in standalone
    if (navigator.standalone) {
        return false;
    }
    if (session.getItem('iOSNotice') === 'true') return false;
    return ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
}

const showPrompt = needsToSeePrompt();

const App = () => {
    const height = use100vh();
    return (
        <div id="app" style={{ height: height - APP_PADDING }}>
            <ScopedCssBaseline />
            <A2HS open={showPrompt} />
            <Suspense fallback={<Fallback />}>
                <AppProvider>
                    <Router>
                        <Route path="/config" component={Config} />
                        <Route path="/legal" component={Legal} />
                        <Route path="/book" component={Book} />
                        <Route exact path="/" component={Home} />
                    </Router>
                </AppProvider>
            </Suspense>
        </div>
    );
};

export default App;
