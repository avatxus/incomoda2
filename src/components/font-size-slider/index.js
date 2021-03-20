import React, { useCallback } from 'react';
import { useAppState, useAppDispatch } from '../../contexts/AppContext';
import styles from './index.module.css';
import Slider from '@material-ui/core/Slider';

const SLIDER_STEP = 50;
const MAX_STEP = 100; // should be a multiple of SLIDER_STEP
const INCREASE_STEP = 2;
const MIN_FONT = window.innerWidth < 600 || window.innerHeight > 800 ? 16 : 10;

const getFontSize = (value) => {
    return MIN_FONT + (value / SLIDER_STEP) * INCREASE_STEP;
};

const getSizeValue = (value) => {
    return Math.ceil(((value - MIN_FONT) / INCREASE_STEP) * SLIDER_STEP);
};

const getValueText = (value) => {
    if (value === 100) return 'grande';
    if (value === 50) return 'mediana';
    return 'normal';
};

const marks = [
    {
        value: 0,
        label: '-',
    },
    {
        value: 50,
        label: 'aA',
    },
    {
        value: 100,
        label: '+',
    },
];

const FontSizeChanger = (props) => {
    const appDispatch = useAppDispatch();
    const appState = useAppState();

    const onChange = useCallback(
        (e, value) => {
            appDispatch({ type: 'SET_FONT_SIZE', fontSize: getFontSize(value) });
        },
        [appDispatch],
    );

    return (
        <div className={styles.wrapper} tabIndex={props.tabIndex}>
            <Slider
                classes={{ markLabel: styles.markLabel }}
                step={SLIDER_STEP}
                marks={marks}
                value={getSizeValue(appState.fontSize)}
                getAriaValueText={getValueText}
                defaultValue={getSizeValue(appState.fontSize) || 0}
                onChange={onChange}
                max={MAX_STEP}
                style={{ color: 'var(--main-color)' }}
            />
        </div>
    );
};

export default FontSizeChanger;
