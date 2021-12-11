import {useEffect, useRef, useState} from 'react';
import {fakeCountryFetch} from '../../../utils';

export const UseFilteredCountries = (input: string, delay: number = 0) => {

    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [isFetching, toggleFetching] = useState<boolean>(false);


    useEffect(() => {
        if (input !== '') {
            toggleFetching(true);
            console.log(input, delay);
            fakeCountryFetch(input, delay)
                .then((response: any[]) => {
                    setFilteredCountries(response);
                })
                .finally(() => {
                    toggleFetching(false);
                });
        }

        setFilteredCountries([]);
    }, [input]);

    return {
        filteredCountries,
        setFilteredCountries,
        countriesFetching: isFetching,
    };
};