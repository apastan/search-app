import React, {FC} from 'react';
import {HomePageLayout} from '../../layouts/HomePageLayout';
import Typography from '@mui/material/Typography';

export const HomePage: FC = () => {
    return (
        <HomePageLayout>
            <Typography variant="h3" component="h1" sx={{textAlign: 'center'}}>Home Page</Typography>
        </HomePageLayout>
    );
};