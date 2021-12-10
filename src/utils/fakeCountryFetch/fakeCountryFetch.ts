import {countriesData} from './data'
import {filterCountries} from '../filterCountries/filterCountries';

export const fakeCountryFetch = (searchInput: string, fetchDelay: number) => new Promise<any[]>((resolve)=> {
    setTimeout(()=> {
        const filteredCountries = filterCountries(countriesData, searchInput)
        resolve(filteredCountries)
    }, fetchDelay)
})