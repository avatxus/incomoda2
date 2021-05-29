import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import FontSizeSlider from '../../components/font-size-slider';
import Header from '../../components/header';

import styles from './index.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import iosAction from '../../assets/icons/ios-action-custom.svg';

console.log("WHAT IS THIS???")

const Page = () => {
    const appState = useAppState();
    const appDispatch = useAppDispatch();
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
        appDispatch({ type: 'SET_CONFIG_VIEWED' });
    }, [appDispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageWrapper}>
                <Header />
                <h1 className={styles.title}>Configuración</h1>

                <div className={styles.textExample}>
                    <h4>Recomendaciones para una mejor lectura:</h4>
                    <div style={{ padding: '8px' }}>
                        <ul>
                            <li>
                                Elegí un tamaño de letra que te quede cómodo. Siem&shy;pre po&shy;dés vol&shy;ver a es&shy;ta
                                pá&shy;gi&shy;na pa&shy;ra cam&shy;biar&shy;lo.
                            </li>
                            <li className={styles.fontSizeWrapper}>
                                <span className={styles.slider}>
                                    <FontSizeSlider tabIndex="0" />
                                </span>
                            </li>
                            <li>Elegí un fondo.</li>
                            <li className={styles.themeWrapper}>
                                <Grid component="label" container alignItems="center" justify="center" spacing={1}>
                                    <Grid item>Claro</Grid>
                                    <Grid item>
                                        <Switch
                                            classes={{ colorPrimary: styles.switch }}
                                            checked={appState.darkTheme || false}
                                            onChange={(e) => appDispatch({ type: 'SET_THEME', darkTheme: e.target.checked })}
                                            name="Modo Oscuro"
                                            color="primary"
                                        />
                                    </Grid>
                                    <Grid item>Oscuro</Grid>
                                </Grid>
                            </li>
                            <li>
                                Arriba a la derecha encontrarás el índice{' '}
                                {<MenuBookOutlinedIcon color="primary" style={{ marginBottom: '-4px' }} />}. Presionalo si querés ir a
                                distintos capítulos del libro o regresar a la con&shy;fi&shy;gu&shy;ración.
                            </li>
                            <li>
                                Para los usuarios de Android, al abrir la página les preguntará si quieren instalarla en su dispositivo. Si
                                aceptan, van a poder leer el libro en pantalla completa y disfrutar de una me&shy;jor
                                ex&shy;pe&shy;rien&shy;cia.
                            </li>
                            <li>
                                Para los usuarios de iPhone o iPad, pueden agregar el libro como una App. Presionan en el ícono{' '}
                                <img src={iosAction} width="24" alt="Agregar a inicio" style={{ verticalAlign: 'sub' }} /> y seleccionan:
                                'Agregar a inicio'
                            </li>
                            <li>
                                Esta aplicación guarda cuál fue la última página que leíste, así que podés cerrár y abrir&shy;la y
                                se&shy;guir le&shy;yen&shy;do.
                            </li>
                        </ul>
                    </div>
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
                    <div className={styles.navigation} onClick={() => history.push('/book')} tabIndex="0">
                        <ArrowRightIcon fontSize="large" color="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
