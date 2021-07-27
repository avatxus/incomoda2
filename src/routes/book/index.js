/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import Swipe from 'react-easy-swipe';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactGA from 'react-ga';

import styles from './index.module.css';
import Header from '../../components/header';
import Loader from '../../components/Loader';

import { useAppState, useAppDispatch } from '../../contexts/AppContext';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import book from '../../assets/markdown/book3.md';

const isInWebAppiOS = window.navigator.standalone === true;

const BOOK_START_PAGE = 5;

const md = new MarkdownIt({ html: true });

// let index = 1;

// md.renderer.rules.paragraph_open = function (tokens, i) {
//     let str;
//     const token = tokens[i];

//     if (token.tag === 'p' && token.type === 'paragraph_open') {
//         console.log(token);
//         str = `<${token.tag} tabindex="${index}">`;
//         index++;
//     }

//     return str;
// };

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
    const nextRef = useRef();
    const prevRef = useRef();

    useEffect(() => {
        ReactGA.pageview('/book');
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
                    window.requestAnimationFrame(() => {
                        nextRef?.current?.blur();
                        window.scrollTo({
                            top: 0,
                        });
                    });
                    appDispatch({ type: 'INCREMENT_PAGE', scrollLeft });
                    break;
                case 'decrement':
                    if (pageRef.current.scrollLeft === 0) return;
                    scrollLeft = appState.clientWidth * (appState.currentPage - 2);
                    pageRef.current.scrollLeft = scrollLeft;
                    window.requestAnimationFrame(() => {
                        prevRef?.current.blur();
                        window.scrollTo({
                            top: 0,
                        });
                    });
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

    const getClientWidth = useCallback(() => {
        if (!pageRef.current) return;
        return parseFloat(window.getComputedStyle(pageRef.current).width);
    }, []);

    const getCurrentPage = useCallback(
        (appState) => {
            if (!pageRef.current) return;
            const clientWidth = getClientWidth();
            return appState.currentPage ? appState.currentPage : clientWidth ? Math.round(pageRef.current.scrollLeft / clientWidth) + 1 : 1;
        },
        [getClientWidth],
    );

    const getPagesCount = useCallback(() => {
        if (!pageRef.current) return;
        const clientWidth = getClientWidth();
        return Math.round(pageRef.current.scrollWidth / clientWidth);
    }, [getClientWidth]);

    const calculateCurrentPageOnRefresh = useCallback(() => {
        const clientWidth = getClientWidth();
        const pagesCount = getPagesCount();
        let currentPage = getCurrentPage(appState);

        let scrollLeft = appState.scrollLeft ? appState.scrollLeft : clientWidth * (currentPage - 1);

        if (pagesCount !== appState.pagesCount && currentPage > BOOK_START_PAGE) {
            currentPage = (appState.progress * pagesCount) / 100;
            if (pagesCount > appState.pagesCount) {
                console.log('bigger font size');
                currentPage = currentPage - appState.pagesCount / 100;
            } else {
                console.log('smaller font size');
                currentPage++;
            }
            console.log('new progress', (currentPage * 100) / pagesCount);
            scrollLeft = clientWidth * (Math.round(currentPage) - 1);
        }
        const fontSize = appState.fontSize ? appState.fontSize : 16;
        pageRef.current.scrollLeft = scrollLeft;
        appDispatch({ type: 'SET_INITIAL_DATA', pagesCount, currentPage: Math.round(currentPage), scrollLeft, fontSize, clientWidth });
    }, [appDispatch, appState, getClientWidth, getCurrentPage, getPagesCount]);

    const calculateCurrentPageOnResize = useCallback(() => {
        console.log('resize callback');
        const clientWidth = getClientWidth();
        const pagesCount = getPagesCount(appState);
        let currentPage = getCurrentPage(appState);

        let scrollLeft = clientWidth * (currentPage - 1);
        // console.log('handle resize client width', { clientWidth, pagesCount, currentPage, scrollWidth: pageRef.current.scrollWidth });
        if (pagesCount !== appState.pagesCount && currentPage > BOOK_START_PAGE) {
            currentPage = Math.round((appState.progress * pagesCount) / 100);

            // if (pagesCount > appState.pagesCount) {
            //     console.log('smaller window');
            //     currentPage = currentPage - appState.pagesCount / 100;
            // } else {
            //     console.log('bigger window');
            //     currentPage++;
            // }
            console.log('new progress', (currentPage * 100) / pagesCount);
            scrollLeft = clientWidth * (currentPage - 1);
        }
        pageRef.current.scrollLeft = scrollLeft;
        appDispatch({ type: 'SET_INITIAL_DATA', pagesCount, currentPage, clientWidth, scrollLeft });
        // pageRef.current.scrollLeft = clientWidth * (currentPage - 1);
    }, [appDispatch, appState, getClientWidth, getCurrentPage, getPagesCount]);

    // handle page resize or font change
    const handleResize = useCallback(() => {
        if (!pageLoaded.current) return;
        console.log('resizing triggered');
        setLoaded(false);
        calculateCurrentPageOnResize();
        setLoaded(true);
    }, [calculateCurrentPageOnResize]);

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
        calculateCurrentPageOnRefresh();
        pageLoaded.current = true;
        setLoaded(true);
        window.requestAnimationFrame(() => {
            window.scrollTo({
                top: 0,
            });
        });
    }, [calculateCurrentPageOnRefresh, hash, html]);

    // Hash navigation
    useEffect(() => {
        if (!html || !hash || !pageRef.current) return;
        console.log('anchor triggered ');
        // setLoaded(false);
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
        const clientWidth = getClientWidth();
        const currentPage = Math.round(pageRef.current.scrollLeft / clientWidth) + 1;
        const scrollLeft = pageRef.current.scrollLeft;
        appDispatch({ type: 'SET_CURRENT_PAGE', currentPage, scrollLeft });
        pageLoaded.current = true;
        setLoaded(true);
    }, [appDispatch, getClientWidth, hash, html]);

    // focus
    // useEffect(() => {
    //     const sections = Array.from(pageRef.current.querySelectorAll('p'));
    //     const intersecting = new Set();
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     console.log({ entry });
    //                     if (entry?.target) {
    //                         entry.target.focus();
    //                     }
    //                     intersecting.add(entry.target.id);
    //                 } else {
    //                     intersecting.delete(entry.target.id);
    //                 }
    //             });
    //             if (!intersecting.size) return;
    //             if (intersecting.size === 1) {
    //                 console.log(intersecting);
    //                 return;
    //             }
    //             sections.some((el) => {
    //                 if (intersecting.has(el.id)) {
    //                     console.log(intersecting.values().next().value);
    //                     return true;
    //                 }
    //                 return false;
    //             });
    //         },
    //         {
    //             root: pageRef.current,
    //             rootMargin: '0px',
    //             threshold: 0.5,
    //         },
    //     );
    //     sections.forEach((el) => {
    //         observer.observe(el);
    //     });
    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [html]);

    return (
        <Swipe onSwipeLeft={onSwipedLeft} onSwipeRight={onSwipedRight} tolerance={80} style={{ height: '100%', background: 'var(--bg)' }}>
            <article className="wrapper" lang="es" style={{ height: '100%' }}>
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
                    <div className={styles.pageFooter} style={{ bottom: isInWebAppiOS ? '8px' : '0' }}>
                        {!appState.isFirstPage ? (
                            <div
                                tabIndex="0"
                                role="button"
                                aria-label="página-anterior"
                                className={styles.navigation}
                                onClick={() => setActivePage('decrement')}
                                ref={prevRef}
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
                                ref={prevRef}
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
                            ref={nextRef}
                        >
                            <ArrowRightIcon fontSize="large" color="primary" />
                        </div>
                    </div>
                </div>
                <div>
                    <LinearProgress aria-hidden variant="determinate" value={appState ? appState.progress : 0} />
                </div>
            </article>
        </Swipe>
    );
};

export default Page;
