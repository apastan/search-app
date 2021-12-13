import React, {useState} from 'react';


export const UseMyPagination = (items: any[], itemsPerPage: number) => {
    const [page, setPage] = useState<number>(1);
    const pagesTotalCount = Math.ceil(items.length / itemsPerPage);
    const itemsToRender = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return {page, setPage, pagesTotalCount, itemsToRender, handlePageChange}
}