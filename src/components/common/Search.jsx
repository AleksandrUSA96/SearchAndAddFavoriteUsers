import React from "react";
import {FormControl, Input, InputLabel} from "@material-ui/core";

let Search = () => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="search">Найти пользователей</InputLabel>
            <Input id="search"/>
        </FormControl>
    )
}

export default Search;