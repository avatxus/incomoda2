import React, { useState } from 'react';
import Menu from '../menu/index';
import styles from './index.module.css';

const Header = () => {
    const [showNav, setShowNav] = useState();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerItems}>
                <Menu showNav={showNav} setShowNav={setShowNav} tabIndex="0" />
            </div>
        </div>
    );
};

export default Header;
