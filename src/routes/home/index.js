import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppState } from '../../contexts/AppContext';
import Cover from './Cover.js';
import styles from './index.module.css';
import Swipe from 'react-easy-swipe';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Page = () => {
    const appState = useAppState();
    const history = useHistory();
    const query = useQuery();

    const menu = query.get('menu');

    const onSwipeLeft = useCallback(() => {
        appState.hasConfig ? history.push('/book') : history.push('/config');
    }, [appState.hasConfig, history]);

    const handleKeydown = useCallback(
        (e) => {
            switch (e.keyCode) {
                case 39: // ArrowRight
                case 40: // ArrowDown
                    onSwipeLeft();
                    break;
                default:
                    break;
            }
        },
        [onSwipeLeft],
    );

    // Keydown
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown, { passive: true });

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

    // go to book page if already viewing book
    useEffect(() => {
        if (appState?.currentPage > 1 && !menu) {
            history.push('/book');
        }
    }, [appState?.currentPage, history, menu]);

    return (
        <Swipe onSwipeLeft={onSwipeLeft} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }} tolerance={100}>
            <div className={styles.wrapper}>
                <div className={styles.pageWrapper}>
                    <Cover />
                    <div className={styles.pageFooter}>
                        <div tabIndex="0" className={styles.navigation} onClick={onSwipeLeft} role="button" aria-label="pagina-siguiente">
                            <ArrowRightIcon fontSize="large" color="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </Swipe>
    );
};

export default Page;
