import React, {FC} from 'react';
import {Container} from '@mui/material';

export const HomePageLayout: FC = ({children}) => {
    return (
        <>
            <Container maxWidth="lg" >
                <main>
                    {children}
                </main>
            </Container>
        </>
    );
};