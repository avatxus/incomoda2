import React, { useReducer, useContext, createContext } from 'react';
import localStorage from '../lib/storage';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const storageState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeColors = {
    light: {
        color: '#343434',
        bg: '#fefcea',
        bgGradient: 'linear-gradient(to right, #fefcea 0%, #efeee8 100%)',
        bodyBg: '#f8f9fa',
    },
    dark: {
        color: '#fff',
        bg: '#121212',
        bgGradient: 'linear-gradient(to right, #0b0b09 0%, #1f1d12 100%)',
        bodyBg: '#3f3f3f',
    },
};

const setTheme = (name) => {
    document.body.style.setProperty('--color', themeColors[name].color);
    document.body.style.setProperty('--bg', themeColors[name].bg);
    document.body.style.setProperty('--bg-gradient', themeColors[name].bgGradient);
    document.body.style.setProperty('--body-bg', themeColors[name].bodyBg);
};

const setFontSize = (size) => {
    document.body.style.setProperty('--font-size', `${size}px`);
};

if (storageState) {
    setTheme(storageState.darkTheme ? 'dark' : 'light');
    setFontSize(storageState.fontSize);
} else {
    setTheme(darkOS ? 'dark' : 'light');
    setFontSize(16);
}

const defaultAppState = storageState || {
    pagesCount: 0,
    currentPage: '',
    isFirstPage: true,
    isLastPage: false,
    scrollLeft: 0,
    fontSize: 16,
    progress: 0,
    darkTheme: darkOS,
    hasConfig: false,
    legal: false,
};

function appReducer(state, action) {
    let output;
    switch (action.type) {
        case 'INCREMENT_PAGE':
            output = {
                ...state,
                currentPage: state.currentPage + 1,
                isLastPage: state.currentPage + 1 === state.pagesCount,
                isFirstPage: false,
                scrollLeft: action.scrollLeft,
                progress: ((state.currentPage + 1) * 100) / state.pagesCount,
            };
            break;

        case 'DECREMENT_PAGE':
            output = {
                ...state,
                currentPage: state.currentPage - 1,
                isFirstPage: state.currentPage - 1 === 1,
                isLastPage: false,
                scrollLeft: action.scrollLeft,
                progress: ((state.currentPage - 1) * 100) / state.pagesCount,
            };
            break;
        case 'SET_INITIAL_DATA':
            output = {
                ...state,
                pagesCount: action.pagesCount,
                currentPage: action.currentPage,
                isFirstPage: action.currentPage === 1,
                isLastPage: action.currentPage === action.pagesCount,
                fontSize: action.fontSize || state.fontSize,
                clientWidth: action.clientWidth,
                progress: (action.currentPage * 100) / action.pagesCount,
            };
            break;
        case 'SET_CURRENT_PAGE':
            output = {
                ...state,
                currentPage: action.currentPage,
                isFirstPage: action.currentPage === 1,
                scrollLeft: typeof action.scrollLeft !== 'undefined' ? action.scrollLeft : state.scrollLeft,
                isLastPage: action.currentPage === state.pagesCount,
                progress: (action.currentPage * 100) / state.pagesCount,
            };
            break;
        case 'SET_FONT_SIZE':
            output = {
                ...state,
                prevFontSize: state.fontSize,
                fontSize: action.fontSize,
            };
            setFontSize(action.fontSize);
            break;
        case 'SET_CONFIG_VIEWED':
            output = {
                ...state,
                hasConfig: true,
            };
            break;

        case 'SET_THEME':
            output = {
                ...state,
                darkTheme: action.darkTheme,
            };
            if (action.darkTheme) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
            break;
        default: {
            output = { ...state };
            break;
        }
    }
    localStorage.setItem('state', JSON.stringify(output));
    return output;
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, defaultAppState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}

function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context;
}

export { AppProvider, useAppState, useAppDispatch };
