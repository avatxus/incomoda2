import { Router } from 'preact-router';
import { AppProvider } from '../contexts/AppContext';
import Book from '../routes/book';
import Home from '../routes/home';
import Config from '../routes/config';
import Legal from '../routes/legal';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { use100vh } from 'react-div-100vh';
import { session } from '../lib/storage';
import A2HS from '../components/a2hs';

const APP_PADDING = typeof window !== 'undefined' ? (window.innerWidth > 500 ? 24 * 2 : 0) : 0;

function needsToSeePrompt() {
    // if already in standalone
    if (typeof window !== 'undefined') {
        if (navigator.standalone) {
            return false;
        }
        if (session.getItem('iOSNotice') === 'true') return false;
        return ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
    }
    return false;
}

const showPrompt = needsToSeePrompt();

const App = () => {
    const height = use100vh();
    return (
        <div id="app" style={{ height: height - APP_PADDING }}>
            <ScopedCssBaseline />
            <A2HS open={showPrompt} />
            <AppProvider>
                <Router>
                    <Home path="/" />
                    <Config path="/config" />
                    <Legal path="/legal" />
                    <Book path="/book" />
                </Router>
            </AppProvider>
        </div>
    );
};

export default App;
