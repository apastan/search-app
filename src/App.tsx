import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {BaseLayout} from './components/layouts/BaseLayout';
import {
    HomePage,
    NotFound,
    SearchOnClientOnClickControlledInput,
    SearchOnClientSideAutocomplete, SearchOnServerSideAutocomplete, SearchOnServerSideOnClickUncontrolledInput
} from './components/pages';


export function App() {
    console.log('рендер App');

    return (
        <>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="search-client-autocomplete" element={<SearchOnClientSideAutocomplete/>}/>
                    <Route path="search-client-onclick" element={<SearchOnClientOnClickControlledInput/>}/>
                    <Route path="search-server-autocomplete" element={<SearchOnServerSideAutocomplete/>}/>
                    <Route path="search-server-onclick" element={<SearchOnServerSideOnClickUncontrolledInput/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    );
}

