import React from 'react';
import {FormControl, Input, InputLabel} from '@material-ui/core';

let Search = ({searchUsersHandler}) => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor='search'>Найти пользователей</InputLabel>
            <Input id='search' onChange={(e) => searchUsersHandler(e.target.value)}/>
        </FormControl>
    )
}

export default Search;