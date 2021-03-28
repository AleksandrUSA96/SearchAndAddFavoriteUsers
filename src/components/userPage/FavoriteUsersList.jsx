import React, {useContext, useEffect, useState} from "react";
import {Avatar, Box} from "@material-ui/core";
import {UserContext} from "../../UserContext";


let FavoriteUsersList = () => {
    const {transmittedUser} = useContext(UserContext)
    const [favoriteUser, setFavoriteUser] = useState(null);
    console.log(transmittedUser);
    useEffect(() => {
        setFavoriteUser(transmittedUser);
        console.log(favoriteUser);
    }, [transmittedUser])

    return (
        <Box width="50%">
            <Box display={'flex'} alignItems={'center'} border={1}
                 borderColor={'grey.200'}
                 px={2} py={1.4} fontFamily="Roboto, Helvetica, Arial, sans-serif" lineHeight={1.75}>
                Избранные пользователи
            </Box>
            <Box display={'flex'} direction={'row'} alignItems={'center'} border={1} borderColor={'grey.200'}
                 p={1}>
                {/*<Box style={{cursor: 'pointer'}} draggable={true} display={'flex'} direction={'row'} alignItems={'center'}*/}
                {/*     border={1}*/}
                {/*     borderColor={'grey.200'}*/}
                {/*     borderRadius={5} my={1} p={1}*/}
                {/*>*/}
                {/*    <Box mr={1}>*/}
                {/*        <Avatar src={favoriteUser.picture.thumbnail}/>*/}
                {/*    </Box>*/}
                {/*    <div>*/}
                {/*        <Box align={'left'} fontSize={14}>{favoriteUser.name.title} {favoriteUser.name.first} {favoriteUser.name.last},*/}
                {/*            дата регистрации: {favoriteUser.registered.date.slice(0, 10)} </Box>*/}
                {/*        <Box align={'left'} fontSize={14}>Email: {favoriteUser.email}</Box>*/}
                {/*    </div>*/}
                {/*</Box>*/}

            </Box>
        </Box>
    )
}

export default FavoriteUsersList;