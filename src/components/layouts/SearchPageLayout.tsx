import React, {FC} from 'react';
import {Container} from '@mui/material'

export const SearchPageLayout: FC = ({children}) => {
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