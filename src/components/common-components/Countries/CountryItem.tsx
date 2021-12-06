import React, {FC} from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';

type TCountryItem = {
    country: any
}

export const CountryItem: FC<TCountryItem> = ({country}) => {
    const {flag} = country
    return (
        <>
            <Card sx={{maxWidth: 250}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={flag}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {country.name}
                    </Typography>

                </CardContent>
            </Card>
        </>
    );
};