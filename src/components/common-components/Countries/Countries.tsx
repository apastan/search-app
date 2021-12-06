import React, {FC} from 'react';
import {CountryItem} from './CountryItem';
import {Box, Grid, Typography} from '@mui/material';

type TCountries = {
    countries: any[]
}

export const Countries: FC<TCountries> = React.memo(({countries}) => {
    console.log(`Рендер Countries Component`);

    if (countries.length === 0) return (

        <Typography>I can't find countries with such queer name :(</Typography>

    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    countries.map((country) => {
                        return (

                        <Grid item xs={2} sm={4} md={4} key={country.alpha2Code} >
                            <CountryItem country={country} />
                        </Grid>
                        );
                    })
                }
                </Grid>
            </Box>
        </>
    );
});