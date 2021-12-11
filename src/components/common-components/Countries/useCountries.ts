import {useEffect, useState} from 'react';
import axios from 'axios';


export const useCountries = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

    const countriesFetching = countries.length === 0
    const showFilteredCountries = filteredCountries.length > 0

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then((response) => {
                setCountries(response.data);
                setFilteredCountries(response.data);
            });
    }, []);

    return {countries, filteredCountries, setFilteredCountries, countriesFetching, showFilteredCountries}
}