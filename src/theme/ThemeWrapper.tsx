import React, {FC} from 'react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

export const ThemeWrapper: FC = ({children}) => {
    const theme = createTheme({
        typography: {
            fontFamily: [
                '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                'sans-serif'
            ].join(','),
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
};