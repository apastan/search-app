import React, {FC} from 'react';
import {Typography} from '@mui/material';

export const CountriesNotFound: FC = () => {
    return (
        <>
            <Typography variant="h6" sx={{textAlign: 'center', pt: 2, pb: 2}}>I can't find countries with such queer name :(</Typography>
        </>
    );
};