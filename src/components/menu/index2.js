import React, { useCallback, useMemo } from 'react';
import Drawer from '@material-ui/core/Drawer';

import styles from './index.module.css';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import { useAppState } from '../../contexts/AppContext';

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
            <CustomLink key="menu" href="/?menu=true">Inicio</CustomLink>,
            <CustomLink key="config" href="/config" onClick={hideNav}>
                Configuración
            </CustomLink>,
            <CustomLink key="intro" href="/book#introduccion" onClick={hideNav}>
                Introducción
            </CustomLink>,
            <CustomLink key="tipificacion" href="/book#tipificacion" onClick={hideNav}>
                La tipificación de los cuerpos
            </CustomLink>,
            <CustomLink key="mandato" href="/book#mandato" onClick={hideNav}>
                El mandato de encontrar un estilo
            </CustomLink>,
            <CustomLink key="maternidad" href="/book#maternidad" onClick={hideNav}>
                Imagen y maternidad
            </CustomLink>,
            <CustomLink key="contaminacion" href="/book#contaminacion" onClick={hideNav}>
                Moda, contaminación ambiental y métodos de trabajo
            </CustomLink>,
            <CustomLink key="cambios" href="/book#cambios" onClick={hideNav}>
                Pequeñas acciones, grandes cambios
            </CustomLink>,
        ],
        [hideNav],
    );

    return (
        <div style={{ height: 'auto' }} aria-hidden="true">
            <div role="button" tabIndex="0" className={styles.menuButtonWrapper} onClick={() => setShowNav(true)} aria-hidden>
                <MenuBookOutlinedIcon size="large" color="primary" />
            </div>
            <Drawer
                open={showNav}
                onBackdropClick={() => setShowNav(false)}
                className={styles.drawer}
                hysteresis={1}
            >
                <Title />
                <hr />
                <div className={styles.navWrapper}>{navItems}</div>
            </Drawer>
        </div>
    );
};

export default Menu;
