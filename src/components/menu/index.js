import React, { useCallback, useMemo, useRef } from 'react';

import styles from './index.module.css';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookTwoTone';
import SideNav from './sidenav';
import igLogo from '../../assets/ig-logo.png';

const CustomLink = ({ href, onClick, children }) => {
    return (
        <a onClick={onClick} className={styles.menuLink} href={href} native="true">
            {children}
        </a>
    );
};

const Title = () => {
    return (
        <div className={styles.navTitle}>
            <div style={{ fontSize: 32 }}>Incómoda</div>
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
        <div style={{ height: 'auto' }}>
            <div ref={menuRef} role="button" tabIndex="0" className={styles.menuButtonWrapper} onClick={handleClick} aria-label="menú">
                <MenuBookOutlinedIcon size="large" color="primary" />
            </div>
            <SideNav open={showNav} onBackdropClick={() => setShowNav(false)} className={styles.drawer} hysteresis={1}>
                <Title />
                <hr />
                <div className={styles.navWrapper}>{navItems}</div>
                <div className={styles.footer}>
                    <hr />

                    <a className={styles.email} href="mailto:incomodaok@gmail.com" target="_blank" rel="noreferrer">
                        incomodaok@gmail.com
                    </a>
                    <a href="https://instagram.com/incomodaok" target="_blank" rel="noreferrer" className={styles.igWrapper}>
                        <img src={igLogo} width="24" height="24" alt="Instagram" />
                        <span className={styles.igName}>@incomodaok</span>
                    </a>
                </div>
            </SideNav>
        </div>
    );
};

export default Menu;
