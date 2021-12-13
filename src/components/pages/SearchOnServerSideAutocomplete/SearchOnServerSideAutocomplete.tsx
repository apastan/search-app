import React, {FC, useState} from 'react';
import {SearchPageLayout} from '../../layouts/SearchPageLayout';
import Typography from '@mui/material/Typography';
import {Box, Button, Pagination, Stack, TextField} from '@mui/material';
import {
    Countries,
    CountriesNotFound,
    Preloader,
    SelectResponseDelay,
    UseFetchDelay,
    UseFilteredCountries
} from '../../common-components';
import {UseMyPagination} from '../../../hooks/UseMyPagination';

const COUNTRIES_PER_PAGE = 6;

export const SearchOnServerSideAutocomplete: FC = () => {
    console.log(`Рендер SearchOnServerSideAutocomplete Component`);

    const [searchInput, setSearchInput] = useState<string>('');

    const {fetchDelay, onDelayChange, delays} = UseFetchDelay(300);

    const {filteredCountries, countriesFetching, setFilteredCountries} = UseFilteredCountries(searchInput, fetchDelay);

    const {
        page,
        setPage,
        pagesTotalCount,
        itemsToRender,
        handlePageChange
    } = UseMyPagination(filteredCountries, COUNTRIES_PER_PAGE);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.currentTarget.value);
        setPage(1);
    };

    const clearSearchInput = () => {
        setSearchInput('');
        setFilteredCountries([]);
        setPage(1);
    };

    const showSearchResults = !countriesFetching && searchInput.length > 0 && itemsToRender.length > 0;
    const showNothingFound = !countriesFetching && searchInput.length > 0 && itemsToRender.length === 0;

    return (
        <SearchPageLayout>
            <Typography variant="h3" component="h1" sx={{textAlign: 'center', pt: 2, pb: 2, m: 0}}>
                Search On Server Side Autocomplete
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
                    <SelectResponseDelay onSelect={onDelayChange} defaultValue={fetchDelay}
                                         values={delays}/>
                </Stack>
            </Box>

            {
                countriesFetching && <Preloader/>
            }


            {
                showSearchResults && (
                    <>
                        <Countries countries={itemsToRender}/>

                        <Box sx={{pt: 8, justifyContent: 'center', display: 'flex'}}>
                            <Pagination count={pagesTotalCount} page={page} onChange={handlePageChange}/>
                        </Box>
                    </>
                )
            }

            {
                showNothingFound && <CountriesNotFound/>
            }

        </SearchPageLayout>
    );
};