import React, {FC, useState} from 'react';
import {SearchPageLayout} from '../../layouts/SearchPageLayout';
import {Box, Button, Pagination, Stack, TextField, Typography} from '@mui/material';
import {Countries, CountriesNotFound, Preloader, useCountries} from '../../common-components';
import {filterCountries} from '../../../utils';
import {UseMyPagination} from '../../../hooks/UseMyPagination';


const COUNTRIES_PER_PAGE: number = 6;

export const SearchOnClientSideAutocomplete: FC = () => {
    console.log(`Рендер SearchOnClientSideAutocomplete Component`);

    const {
        countries,
        filteredCountries,
        setFilteredCountries,
        countriesFetching,
        showFilteredCountries
    } = useCountries();

    const {
        page,
        setPage,
        pagesTotalCount,
        itemsToRender,
        handlePageChange
    } = UseMyPagination(filteredCountries, COUNTRIES_PER_PAGE);

    const [searchInput, setSearchInput] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        setPage(1);
        setFilteredCountries(filterCountries(countries, e.currentTarget.value));
    };

    const clearSearchInput = () => {
        setSearchInput('');
        setPage(1);
        setFilteredCountries(countries);
    };

    if (countriesFetching) return <Preloader/>;

    return (
        <SearchPageLayout>

            <Typography variant="h3" component="h1" sx={{textAlign: 'center', pt: 2, pb: 2, m: 0}}>
                Search On Client Side Autocomplete
            </Typography>

            <Box sx={{mt: 3, mb: 3, justifyContent: 'center', display: 'flex', pb: 6, pt: 4, m: 0}}>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Enter country name"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={clearSearchInput}>Clear</Button>
                </Stack>
            </Box>

            {
                showFilteredCountries
                    ? (
                        <>
                            <Countries countries={itemsToRender}/>
                            <Box sx={{pt: 8, justifyContent: 'center', display: 'flex'}}>
                                <Pagination count={pagesTotalCount} page={page} onChange={handlePageChange}/>
                            </Box>
                        </>
                    )
                    : <CountriesNotFound/>
            }

        </SearchPageLayout>
    );
};