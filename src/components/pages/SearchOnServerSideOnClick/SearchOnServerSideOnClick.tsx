import React, {FC, useRef, useState} from 'react';
import {SearchPageLayout} from '../../layouts/SearchPageLayout';
import Typography from '@mui/material/Typography';
import {Box, Button, Pagination, Stack, TextField} from '@mui/material';
import {Countries, Preloader} from '../../common-components';
import {fakeCountryFetch} from '../../../utils';
import {SelectResponseDelay} from '../../common-components/SelectResponseDelay/SelectResponseDelay';

const COUNTRIES_PER_PAGE = 6;
const AVAILABLE_DELAYS = [10, 20, 30, 40, 50, 75, 100, 125, 150, 200];
const DEFAULT_FETCH_DELAY = 20;

export const SearchOnServerSideOnClickUncontrolledInput: FC = () => {
    console.log(`Рендер SearchOnServerSideOnClickControlledInput Component`);
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [isFetching, toggleFetching] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const pagesTotalCount = Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE);

    const fetchDelay = useRef(DEFAULT_FETCH_DELAY);

    const searchInputRef = useRef('');
    console.log(searchInputRef);

    const onDelayChange = (delay: number) => {
        fetchDelay.current = delay;
    };

    const handleSearchClick = () => {
        // @ts-ignore
        const searchInput = searchInputRef.current.value
        if (searchInput === '') return

        toggleFetching(true);
        fakeCountryFetch(searchInput, fetchDelay.current).then((response: any[]) => {
            setFilteredCountries(response);
            toggleFetching(false);
        });
    };

    const clearSearchInput = () => {
        // @ts-ignore
        const searchInput = searchInputRef.current.value
        if (searchInput === '') return

        //@ts-ignore
        searchInputRef.current.value = '';
    };

    const countriesToRender = filteredCountries.slice((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const showSearchResults = !isFetching && searchInputRef.current !== '' && countriesToRender.length > 0;
    const showNothingFound = !isFetching && searchInputRef.current !== ''  && countriesToRender.length === 0;

    return (
        <SearchPageLayout>
            <Typography variant="h3" component="h1" sx={{textAlign: 'center', pt: 2, pb: 2, m: 0}}>
                Search On Server Side OnClick Uncontrolled Input
            </Typography>

            <Box sx={{mt: 3, mb: 3, justifyContent: 'center', display: 'flex', pb: 6, pt: 4, m: 0}}>
                <Stack spacing={2} direction="row">
                    <TextField
                        label="Enter country name"
                        variant="outlined"
                        inputRef={searchInputRef}
                    />
                    <Button variant="contained" onClick={clearSearchInput}>Clear</Button>
                    <Button variant="contained" onClick={handleSearchClick}>Search</Button>
                    <SelectResponseDelay onSelect={onDelayChange} defaultValue={DEFAULT_FETCH_DELAY}
                                         values={AVAILABLE_DELAYS}/>
                </Stack>
            </Box>

            {
                isFetching && <Preloader/>
            }

            {
                showSearchResults && (
                    <>
                        <Countries countries={countriesToRender}/>

                        <Box sx={{pt: 8, justifyContent: 'center', display: 'flex'}}>
                            <Pagination count={pagesTotalCount} page={page} onChange={handlePageChange}/>
                        </Box>
                    </>
                )
            }


            {
                showNothingFound && (
                    <Typography variant="h6" sx={{textAlign: 'center', pt: 2, pb: 2}}>
                        I can't find countries with such queer name :(
                    </Typography>
                )
            }

        </SearchPageLayout>
    );
};