import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {SearchPageLayout} from '../../layouts/SearchPageLayout';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {Countries, Preloader} from '../../common-components';
import {Box, Button, Pagination, Stack, TextField} from '@mui/material';

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

export const SearchOnClientOnClickControlledInput: FC = () => {
    console.log(`Рендер SearchOnClientSideOnClick Component`);
    const [countries, setCountries] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const COUNTRIES_PER_PAGE = 6;
    const pagesTotalCount = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

    //const searchInputRef = useRef()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            return clearSearchInput();
        }
        setSearchInput(e.currentTarget.value);
    };

    const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        //const searchInput = searchInputRef.current.value

        setSearchInput(searchInput);
        setFilteredCountries(filterCountries(countries, searchInput));
        setPage(1);
        console.log(e.currentTarget.value);
        console.log(filterCountries(countries, searchInput));
    };

    const clearSearchInput = () => {
        setSearchInput('');
        setFilteredCountries(countries);
        setPage(1);
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            });
    }, []);

    const countriesToRender = useMemo(() => {
        return filteredCountries.slice((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE)
    }, [filteredCountries, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (countries.length === 0) {
        return <Preloader/>;
    }

    return (
        <SearchPageLayout>

            <Typography variant="h3" component="h1" sx={{textAlign: 'center', pt: 2, pb: 2, m: 0}}>
                Search On Client Side OnClick
            </Typography>

            <Box sx={{mt: 3, mb: 3, justifyContent: 'center', display: 'flex', pb: 6, pt: 4, m: 0}}>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Enter country name"
                        variant="outlined"
                        value={searchInput}
                        //inputRef={searchInputRef}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={clearSearchInput}>Clear</Button>
                    <Button variant="contained" onClick={handleSearchClick}>Search</Button>
                </Stack>
            </Box>

            <Countries countries={countriesToRender}/>

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

export const SearchOnClientSideOnClickUncontrolledInput: FC = () => {
    console.log(`Рендер SearchOnClientSideOnClick Component`);
    const [countries, setCountries] = useState<any[]>([]);
    //const [searchInput, setSearchInput] = useState<string>('');
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const COUNTRIES_PER_PAGE = 6;
    const pagesTotalCount = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

    const searchInputRef = useRef()

/*    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            return clearSearchInput();
        }
        setSearchInput(e.currentTarget.value);
    };*/

    const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        const searchInput = searchInputRef.current.value

        //setSearchInput(searchInput);
        setFilteredCountries(filterCountries(countries, searchInput));
        setPage(1);
        console.log(e.currentTarget.value);
        console.log(filterCountries(countries, searchInput));
    };

    const clearSearchInput = () => {
        //setSearchInput('');
        //@ts-ignore
        searchInputRef.current.value = ''
        setFilteredCountries(countries);
        setPage(1);
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            });
    }, []);

    const countriesToRender = useMemo(() => {
        return filteredCountries.slice((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE)
    }, [filteredCountries, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (countries.length === 0) {
        return <Preloader/>;
    }

    return (
        <SearchPageLayout>

            <Typography variant="h3" component="h1" sx={{textAlign: 'center', pt: 2, pb: 2, m: 0}}>
                Search On Client Side OnClick
            </Typography>

            <Box sx={{mt: 3, mb: 3, justifyContent: 'center', display: 'flex', pb: 6, pt: 4, m: 0}}>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Enter country name"
                        variant="outlined"
                        //value={searchInput}
                        inputRef={searchInputRef}
                        //onChange={handleInputChange}
                    />
                    <Button variant="contained" onClick={clearSearchInput}>Clear</Button>
                    <Button variant="contained" onClick={handleSearchClick}>Search</Button>
                </Stack>
            </Box>

            <Countries countries={countriesToRender}/>

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