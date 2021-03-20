/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import Swipe from 'react-easy-swipe';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './index.module.css';
import Header from '../../components/header';
import Loader from '../../components/Loader';

import { useAppState, useAppDispatch } from '../../contexts/AppContext';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import book from '../../assets/markdown/book3.md';

const md = new MarkdownIt({ html: true });

function getCurrentUrl() {
    if (typeof window !== 'undefined') {
        return window.location;
    }
}

function removeHash() {
    if (typeof window !== 'undefined') {
        window.location.hash = '';
        return;
    }
}

const Page = () => {
    const pageRef = useRef();
    const appState = useAppState();
    const appDispatch = useAppDispatch();
    const { hash } = getCurrentUrl();
    // use for initial page loads, to not show the content before it is set.
    const [loaded, setLoaded] = useState(false);
    // used for hash redirects
    const pageLoaded = useRef(false);
    const history = useHistory();
    const [html, setHtml] = useState();

    useEffect(() => {
        fetch(book)
            .then((res) => res.text())
            .then((res) => setHtml(md.render(res)));
    }, []);

    const setActivePage = useCallback(
        (type) => {
            if (type === null) return;
            let scrollLeft;
            removeHash();
            switch (type) {
                case 'increment':
                    scrollLeft = appState.clientWidth * appState.currentPage;
                    pageRef.current.scrollLeft = scrollLeft;
                    appDispatch({ type: 'INCREMENT_PAGE', scrollLeft });
                    break;
                case 'decrement':
                    if (pageRef.current.scrollLeft === 0) return;
                    scrollLeft = appState.clientWidth * (appState.currentPage - 2);
                    pageRef.current.scrollLeft = scrollLeft;
                    appDispatch({ type: 'DECREMENT_PAGE', scrollLeft });
                    break;
                default:
                    break;
            }
        },
        [appDispatch, appState.clientWidth, appState.currentPage],
    );

    const onSwipedRight = useCallback(() => {
        !appState.isFirstPage ? setActivePage('decrement') : history.push('/');
    }, [appState.isFirstPage, history, setActivePage]);

    const onSwipedLeft = useCallback(() => {
        !appState.isLastPage && setActivePage('increment');
    }, [appState.isLastPage, setActivePage]);

    const handleKeydown = useCallback(
        (e) => {
            switch (e.keyCode) {
                case 39: // ArrowRight
                    !appState.isLastPage && setActivePage('increment');
                    break;
                case 37: // ArrowLeft
                    !appState.isFirstPage ? setActivePage('decrement') : history.push('/');
                    break;
                default:
                    break;
            }
        },
        [appState.isFirstPage, appState.isLastPage, history, setActivePage],
    );

    // handle page resize or font change
    const handleResize = useCallback(() => {
        if (!pageLoaded.current) return;
        console.log('resizing triggered');
        setLoaded(false);
        window.requestAnimationFrame(() => {
            const clientWidth = parseFloat(window.getComputedStyle(pageRef.current).width);
            const pagesCount = Math.round(pageRef.current.scrollWidth / clientWidth);
            const currentPage = clientWidth ? Math.round(pageRef.current.scrollLeft / clientWidth) + 1 : 1;
            console.log('handle resize client width', { clientWidth, pagesCount, currentPage, scrollWidth: pageRef.current.scrollWidth });
            appDispatch({ type: 'SET_INITIAL_DATA', pagesCount, currentPage, clientWidth });
            pageRef.current.scrollLeft = clientWidth * (currentPage - 1);
            setLoaded(true);
        });
    }, [appDispatch]);

    // Keydown
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleKeydown, handleResize]);

    // Page refresh
    useEffect(() => {
        if (!html) return;
        if (hash) return;
        // check if page is already loaded and we are navigating via anchors
        if (pageLoaded.current) return;

        console.log('page refresh 3');
        setLoaded(false);
        // window.requestAnimationFrame(() => {
        const clientWidth = parseFloat(window.getComputedStyle(pageRef.current).width);
        const pagesCount = Math.round(pageRef.current.scrollWidth / clientWidth);
        const currentPage = appState.currentPage
            ? appState.currentPage
            : clientWidth
            ? Math.round(pageRef.current.scrollLeft / clientWidth) + 1
            : 1;
        const scrollLeft = appState.scrollLeft ? appState.scrollLeft : clientWidth * (currentPage - 1);
        const fontSize = appState.fontSize ? appState.fontSize : 16;
        pageRef.current.scrollLeft = scrollLeft;
        appDispatch({ type: 'SET_INITIAL_DATA', pagesCount, currentPage, scrollLeft, fontSize, clientWidth });
        pageLoaded.current = true;
        setLoaded(true);
        // });
    }, [appDispatch, appState.currentPage, appState.fontSize, appState.scrollLeft, hash, html]);

    // Hash navigation
    useEffect(() => {
        if (!html || !hash || !pageRef.current) return;
        console.log('anchor triggered ');
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
        const currentPage = appState?.clientWidth ? Math.round(pageRef.current.scrollLeft / appState.clientWidth) + 1 : 1;
        const scrollLeft = pageRef.current.scrollLeft;
        appDispatch({ type: 'SET_CURRENT_PAGE', currentPage, scrollLeft });
        pageLoaded.current = true;
        setLoaded(true);
    }, [appDispatch, appState.clientWidth, hash, html]);

    // font resize
    useEffect(() => {
        handleResize();
    }, [appState.fontSize, handleResize]);
    // console.log({ appState, pageRef });

    return (
        <Swipe onSwipeLeft={onSwipedLeft} onSwipeRight={onSwipedRight} tolerance={80} style={{ height: '100%' }}>
            <article className="wrapper" lang="es" style={{ height: 'calc(100% - 4px)' }}>
                <Header />
                <div className={styles.pageWrapper}>
                    <div
                        className={`${styles.bookContent} hyphen`}
                        ref={pageRef}
                        style={{ fontSize: appState.fontSize, columnWidth: `${appState.clientWidth}px` }}
                    >
                        <div lang="es" dangerouslySetInnerHTML={{ __html: html }} style={{ height: '100%', opacity: loaded ? 1 : 0 }} />
                        {!loaded && (
                            <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                                <Loader />
                            </div>
                        )}
                    </div>
                    <div className={styles.pageFooter}>
                        {!appState.isFirstPage ? (
                            <div
                                tabIndex="0"
                                role="button"
                                aria-label="página-anterior"
                                className={styles.navigation}
                                onClick={() => setActivePage('decrement')}
                            >
                                <ArrowLeftIcon fontSize="large" color="primary" />
                            </div>
                        ) : (
                            <div
                                tabIndex="0"
                                role="button"
                                aria-label="pagina-anterior"
                                className={styles.navigation}
                                onClick={() => history.push('/')}
                            >
                                <ArrowLeftIcon fontSize="large" color="primary" />
                            </div>
                        )}

                        <div className={styles.pageNumber}>{appState.currentPage}</div>
                        <div
                            tabIndex="0"
                            role="button"
                            aria-label="pagina-siguiente"
                            className={styles.navigation}
                            style={{ visibility: appState.isLastPage ? 'hidden' : 'visible' }}
                            onClick={() => setActivePage('increment')}
                        >
                            <ArrowRightIcon fontSize="large" color="primary" />
                        </div>
                    </div>
                </div>
                <div>
                    <LinearProgress variant="determinate" value={appState ? appState.progress : 0} />
                </div>
            </article>
        </Swipe>
    );
};

export default Page;
