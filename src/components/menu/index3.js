import React, { useCallback, useMemo } from 'react';
import SideNav from 'react-simple-sidenav';
import styles from './index.module.css';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import { useAppState } from '../../contexts/AppContext';

const CustomLink = ({ href, onClick, children }) => {
    const appState = useAppState();
    return (
        <a
            onClick={onClick}
            style={{
                textDecoration: 'none',
                color: appState.darkTheme ? 'white' : 'black',
                fontWeight: 500,
                fontSize: appState.fontSize,
                letterSpacing: 0,
            }}
            href={href}
            native="true"
        >
            {children}
        </a>
    );
};

const Title = () => {
    const { fontSize } = useAppState();
    return (
        <div>
            <h1 style={{ fontStyle: 'initial', fontSize: fontSize * 2 }}>Incómoda</h1>
            <h2 style={{ padding: 0, margin: 0, fontWeight: 700, fontSize: fontSize * 1.5 }}>Cuerpos Libres</h2>
            <hr />
        </div>
    );
};

const Menu = ({ showNav, setShowNav }) => {
    const appState = useAppState();
    const hideNav = useCallback(() => {
        setShowNav(false);
    }, [setShowNav]);

    const navItems = useMemo(
        () => [
            <CustomLink href="/?menu=true">Inicio</CustomLink>,
            <CustomLink href="/config" onClick={hideNav}>
                Configuración
            </CustomLink>,
            <CustomLink href="/book#introduccion" onClick={hideNav}>
                Introducción
            </CustomLink>,
            <CustomLink href="/book#tipificacion" onClick={hideNav}>
                La tipificación de los cuerpos
            </CustomLink>,
            <CustomLink href="/book#mandato" onClick={hideNav}>
                El mandato de encontrar un estilo
            </CustomLink>,
            <CustomLink href="/book#maternidad" onClick={hideNav}>
                Imagen y maternidad
            </CustomLink>,
            <CustomLink href="/book#contaminacion" onClick={hideNav}>
                Moda, contaminación ambiental y métodos de trabajo
            </CustomLink>,
            <CustomLink href="/book#cambios" onClick={hideNav}>
                Pequeñas acciones, grandes cambios
            </CustomLink>,
        ],
        [hideNav],
    );

    return (
        <div style={{ height: 'auto' }} aria-hidden="true">
            <div role="button" tabIndex="0" className={styles.menuButtonWrapper} onClick={() => setShowNav(true)} aria-label="Menu">
                <MenuBookOutlinedIcon size="large" color="primary" />
            </div>
            <SideNav
                showNav={showNav}
                onHideNav={() => setShowNav(false)}
                title={<Title />}
                items={navItems}
                titleStyle={{
                    backgroundColor: appState.darkTheme ? '#121212' : '#4CAF50',
                    height: 'auto',
                    textTransform: 'uppercase',
                    fontStyle: 'initial',
                    // background: '#fefcea',
                    background: appState.darkTheme ? '#121212' : 'linear-gradient(to right, #fefcea 0%, #efeee8 100%)',
                    color: appState.darkTheme ? 'white' : '#000000',
                    paddingBottom: 0,
                }}
                navStyle={{
                    background: appState.darkTheme ? '#121212' : 'linear-gradient(to right, #fefcea 0%, #efeee8 100%)',
                    textAlign: 'left',
                    boxShadow: 'none',
                    maxWidth: 374,
                    // paddingRight: 0,
                    color: appState.darkTheme ? 'white' : '#000000',
                    overflowY: 'scroll',
                }}
                itemStyle={{
                    listStyle: 'none',
                    background: appState.darkTheme ? '#121212' : 'linear-gradient(to right, #fefcea 0%, #efeee8 100%)',
                    padding: appState.fontSize < 16 ? 4 : 8,
                    color: appState.darkTheme ? 'white' : '#000000',
                    fontSize: appState.fontSize,
                }}
                itemHoverStyle={{
                    fontWeight: 800,
                }}
            />
        </div>
    );
};

export default Menu;
