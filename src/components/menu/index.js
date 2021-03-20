import React, { useCallback, useMemo } from 'react';
import Drawer from '@material-ui/core/Drawer';

import styles from './index.module.css';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import { useAppState } from '../../contexts/AppContext';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const CustomLink = ({ href, onClick, children }) => {
    return (
        <a
            onClick={onClick}
            className={styles.menuLink}
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
        <div className={styles.navTitle}>
            <div style={{ fontSize: fontSize * 2 }}>Incómoda</div>
        </div>
    );
};

const Menu = ({ showNav, setShowNav }) => {
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
            <Drawer
                open={showNav}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                onBackdropClick={() => setShowNav(false)}
                className={styles.drawer}
                hysteresis={1}
            >
                <Title />
                <hr />
                <div className={styles.navWrapper}>{navItems}</div>
            </Drawer>
            {/* <SideNav
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
            /> */}
        </div>
    );
};

export default Menu;
