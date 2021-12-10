export const filterCountries = (countries: any[], searchInput: string) => {
    if (!searchInput) {
        console.log('searchInput is empty');
        return countries
    }

    return countries.filter(({name, translations = [], altSpellings = []}) => {
        const joinedCountryNames = [name, ...Object.values(translations), ...altSpellings].join().toLowerCase();
        return joinedCountryNames.includes(searchInput.toLowerCase());
    });
};