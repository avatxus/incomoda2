import React, { useState } from 'react';
import Menu from '../menu/index';
import styles from './index.module.css';
import { useAppState } from '../../contexts/AppContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [showNav, setShowNav] = useState();
    const { progress } = useAppState();
    const { pathname } = useLocation();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerItems}>
                <Menu showNav={showNav} setShowNav={setShowNav} tabIndex="0" />
                {pathname === '/book' ? <div className={styles.percentage}>{Math.floor(progress)}%</div> : null}
            </div>
        </div>
    );
};

export default Header;
