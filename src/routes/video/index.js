import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import Header from '../../components/header';

import PlayButton from '../../assets/yt-play.png';
import VideoImage from '../../assets/video-image.jpg';

import styles from './index.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { loadVideo } from '../../lib/video';

const Page = () => {
    const history = useHistory();

    const handleKeydown = useCallback(
        (e) => {
            switch (e.keyCode) {
                case 39: // ArrowRight
                    history.push('/book');
                    break;
                case 37: // ArrowLeft
                    history.push('/');
                    break;
                default:
                    break;
            }
        },
        [history],
    );

    // Keydown
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown, { passive: true });

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

    useEffect(() => {
        ReactGA.pageview('/');
    }, []);

    return (
        <div className="wrapper">
            <div className={styles.pageWrapper}>
                <Header />
                <div lang="es" className="video-wrapper">
                    <div className="video-container">
                        <div id="player" onClick={loadVideo}>
                            <img src={VideoImage} className="video-placeholder" alt="imagen-video" width="452" height="245" />
                            <div className="video-play-button-wrapper">
                                <img src={PlayButton} className="video-play-button" alt="play-button" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.pageFooter}>
                    {/* <div
                        tabIndex="0"
                        role="button"
                        aria-label="pagina-anterior"
                        className={styles.navigation}
                        onClick={() => history.push('/')}
                    >
                        <ArrowLeftIcon fontSize="large" color="primary" />
                    </div> */}
                    <div className={styles.navigation} onClick={() => history.push('/book')} tabIndex="0">
                        <ArrowRightIcon fontSize="large" color="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
