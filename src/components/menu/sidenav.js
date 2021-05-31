import React, { useEffect, useCallback, useRef } from 'react';

import styles from './index.module.css';

export default function SideNav(props) {
    const ref = useRef();
    const backdropRef = useRef();

    /* Set the width of the side navigation to 250px */
    const openNav = useCallback(() => {
        if (ref?.current) {
            ref.current.style.transform = 'translateX(300px)';
        }
        if (backdropRef?.current) {
            backdropRef.current.style.display = 'block';
            window.requestAnimationFrame(() => {
                backdropRef.current.style.backgroundColor = 'rgba(0,0,0,.5)';
            });
        }
    }, []);

    /* Set the width of the side navigation to 0 */
    const closeNav = useCallback(() => {
        if (ref?.current) {
            ref.current.style.transform = 'translateX(-300px)';
        }

        if (backdropRef?.current) {
            backdropRef.current.style.backgroundColor = 'transparent';
            window.requestAnimationFrame(() => {
                backdropRef.current.style.display = 'none';
            });
        }
    }, []);

    useEffect(() => {
        if (props.open) {
            openNav();
        } else {
            closeNav();
        }
    }, [closeNav, openNav, props.open]);

    return (
        <>
            <div ref={backdropRef} className={styles.backdrop} onClick={props.onBackdropClick}></div>
            <div ref={ref} className={styles.sidenav}>
                {props.children}
            </div>
        </>
    );
}
