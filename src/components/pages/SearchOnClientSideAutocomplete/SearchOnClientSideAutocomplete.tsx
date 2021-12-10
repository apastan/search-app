import React, {FC, useEffect, useState} from 'react';
import {SearchPageLayout} from '../../layouts/SearchPageLayout';
import {Box, Button, Pagination, Stack, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {Countries, Preloader} from '../../common-components';

const filterCountries = (countries: any[], searchInput: string) => {
    if (!searchInput) {
        console.log('searchInput is empty');
        return countries
    }

    return countries.filter(({name, translations = [], altSpellings = []}) => {
        const joinedCountryNames = [name, ...Object.values(translations), ...altSpellings].join().toLowerCase();
        return joinedCountryNames.includes(searchInput.toLowerCase());
    });
};

export const SearchOnClientSideAutocomplete: FC = () => {
    console.log(`Рендер SearchOnClientSideAutocomplete Component`);
    const [countries, setCountries] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const COUNTRIES_PER_PAGE = 6;
    const pagesTotalCount = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        setFilteredCountries(filterCountries(countries, e.currentTarget.value));
        setPage(1);
        //console.log(e.currentTarget.value);
        //console.log(filterCountries(countries, e.currentTarget.value));
    };

    const clearSearchInput = () => {
        setSearchInput('');
        setFilteredCountries(countries)
        setPage(1);
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            });
    }, []);

    const countriesToRender = filteredCountries.slice((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (countries.length === 0) {
        return <Preloader/>;
    }

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
                filteredCountries.length > 0
                    ? <Countries countries={countriesToRender}/>
                    : <Typography variant="h6" sx={{textAlign: 'center', pt: 2, pb: 2}}>I can't find countries with such queer name :(</Typography>
            }


            {
                countriesToRender.length > 0 && (
                    <Box sx={{pt: 8, justifyContent: 'center', display: 'flex'}}>
                        <Pagination count={pagesTotalCount} page={page} onChange={handlePageChange}/>
                    </Box>
                )
            }

        </SearchPageLayout>
    );
};