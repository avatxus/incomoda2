import React, { useEffect, useState } from 'react';
import { session } from '../../lib/storage';

import Snackbar from '@material-ui/core/Snackbar';

import iosAction from '../../assets/icons/ios-action-custom.svg';

const Content = () => (
    <div>
        Podés instalar el libro como una App y leerlo sin conexión. Presioná{' '}
        <img src={iosAction} width="20" alt="Agregar a inicio" style={{ verticalAlign: 'sub' }} /> y seleccioná
        <span style={{ fontWeight: 700 }}> Agregar a inicio</span>
    </div>
);

export default function TransitionsSnackbar(props) {
    const [open, setOpen] = useState(props.open);

    useEffect(() => {
        if (open) {
            session.setItem('iOSNotice', 'true');
        }
    }, [open]);

    return (
        <div>
            <Snackbar open={open} onClose={() => setOpen((open) => !open)} message={<Content />} autoHideDuration={5000} />
        </div>
    );
}
