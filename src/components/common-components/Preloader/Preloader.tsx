import {FC} from 'react';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    svgLoader: {
        animation: 'spin 0.5s linear infinite',
        margin: 'auto',
    },
    divLoader: {
        width: '100vw',
        height: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        maxWidth: '100%',

        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
    },
    '@keyframes spin': {
        '0%': {transform: 'rotate(0deg)'},
        '100%': {transform: 'rotate(360deg)'},
    },
}));


export const Preloader: FC = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.divLoader}>
                <svg className={classes.svgLoader} viewBox="0 0 100 100" width="10em" height="10em">
                    <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none"
                          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC"
                          transform="rotate(179.719 50 51)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                          values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s"
                                          repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
            </div>
        </>
    );
};