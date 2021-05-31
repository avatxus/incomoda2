import React, { useCallback, useMemo, useRef } from 'react';

import styles from './index.module.css';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import { useAppState } from '../../contexts/AppContext';
import SideNav from './sidenav';

const CustomLink = ({ href, onClick, children }) => {
    return (
        <a onClick={onClick} className={styles.menuLink} href={href} native="true">
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
    const menuRef = useRef();

    const hideNav = useCallback(() => {
        setShowNav(false);
    }, [setShowNav]);

    const navItems = useMemo(
        () => [
            <CustomLink key="menu" href="/?menu=true">
                Inicio
            </CustomLink>,
            <CustomLink key="config" href="/config" onClick={hideNav}>
                Configuración
            </CustomLink>,
            <CustomLink key="video" href="/video" onClick={hideNav}>
                Video
            </CustomLink>,
            <CustomLink key="indice" href="/book#indice" onClick={hideNav}>
                Índice
            </CustomLink>,
        ],
        [hideNav],
    );

    const handleClick = useCallback(() => {
        menuRef?.current?.blur();
        setShowNav(true);
    }, [setShowNav]);

    return (
        <div style={{ height: 'auto' }} aria-hidden="true">
            <div ref={menuRef} role="button" tabIndex="0" className={styles.menuButtonWrapper} onClick={handleClick} aria-hidden>
                <MenuBookOutlinedIcon size="large" color="primary" />
            </div>
            <SideNav open={showNav} onBackdropClick={() => setShowNav(false)} className={styles.drawer} hysteresis={1}>
                <Title />
                <hr />
                <div className={styles.navWrapper}>{navItems}</div>
            </SideNav>
        </div>
    );
};

export default Menu;
