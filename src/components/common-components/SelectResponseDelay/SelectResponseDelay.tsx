import React, {FC, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';


type TSelectResponseDelay = {
    onSelect: (delay: number) => void
    defaultValue: number
    values: number[]
}

export const SelectResponseDelay: FC<TSelectResponseDelay> = ({onSelect, defaultValue,values}) => {

    const [fetchDelay, setFetchDelay] = useState<number>(defaultValue);

    const onFetchDelaySelect = (event: SelectChangeEvent) => {
        const delay = Number(event.target.value)
        onSelect(delay)
        setFetchDelay(delay)
    };

    return (
            <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="fetch-delay-label">Response delay</InputLabel>
                <Select
                    labelId="fetch-delay-label"
                    id="fetch-delay"
                    value={String(fetchDelay)}
                    label="Response delay"
                    onChange={onFetchDelaySelect}
                >
                    {
                        values.map((delay)=> <MenuItem key={delay} value={delay}>{`${delay} ms`}</MenuItem>)
                    }
                </Select>
            </FormControl>
    );
};