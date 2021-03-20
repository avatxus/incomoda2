import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import Header from '../../components/header';

import styles from './index.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const Page = () => {
    const appState = useAppState();
    const appDispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        appDispatch({ type: 'SET_LEGAL_VIEWED' });
    }, [appDispatch]);

    return (
        <div className="wrapper">
            <div className={styles.pageWrapper}>
                <Header />
                <div className={styles.content}>
                    <div>Laudonio, Marcela</div>
                    <div>Incómoda : cuerpos libres / Marcela Laudonio;</div>
                    <div>editor literario Victoria Van Morlegan.</div>
                    <div>- 1a ed. - Ciudad Autónoma de Buenos Aires : Marcela Laudonio , 2020.</div>
                    <div>Libro digital, Book "app" for iOS Archivo Digital: online</div>
                    <div>
                        <strong>ISBN</strong> 978-987-86-6605-1
                    </div>
                    <div>1. Moda. 2. Cuidado del Medio Ambiente. 3. Discriminación Basada en el Género.</div>
                    <div>I. Van Morlegan, Victoria, ed. Lit. II. Título. CDD 305.42</div>
                </div>
                <div className={styles.pageFooter}>
                    <div
                        tabIndex="0"
                        role="button"
                        aria-label="pagina-anterior"
                        className={styles.navigation}
                        onClick={() => (appState.hasConfig ? history.push('/') : history.push('/config'))}
                    >
                        <ArrowLeftIcon fontSize="large" color="primary" />
                    </div>
                    <div
                        role="button"
                        aria-label="pagina siguiente"
                        className={styles.navigation}
                        onClick={() => history.push('/book')}
                        tabIndex="0"
                    >
                        <ArrowRightIcon fontSize="large" color="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
