import React from "react";
import {Box} from "@material-ui/core";


let FavoriteUsersList = () => {
    return (
        <Box width="50%">
            <Box display={'flex'} alignItems={'center'} border={1}
                 borderColor={'grey.200'}
                 px={2} py={1.4} fontFamily="Roboto, Helvetica, Arial, sans-serif" lineHeight={1.75}>
                Избранные пользователи
            </Box>
            <Box display={'flex'} direction={'row'} alignItems={'center'} border={1} borderColor={'grey.200'}
                 p={1}>

            </Box>
        </Box>
    )
}

export default FavoriteUsersList;