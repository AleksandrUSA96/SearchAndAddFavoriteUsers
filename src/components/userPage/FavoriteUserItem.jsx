import React from "react";
import {Avatar, Box} from "@material-ui/core";
import Style from './FavoriteUserItem.module.css';

const FavoriteUserItem = ({user, onDragStartItemHandler, onDropSwapUsersInState}) => {
    return (
        <Box className={Style.item} style={{cursor: 'pointer'}} draggable={true} display={'flex'} direction={'row'}
             alignItems={'center'}
             border={1}
             borderColor={'grey.200'}
             borderRadius={5} my={1} p={1}
             onDragStart={(e) => onDragStartItemHandler(user)}
             onDrop={(e) => onDropSwapUsersInState(user)}
        >
            <Box mr={1}>
                <Avatar src={user.picture.thumbnail}/>
            </Box>
            <div>
                <Box align={'left'} fontSize={14}>{user.name.title} {user.name.first} {user.name.last},
                    дата регистрации: {user.registered.date.slice(0, 10)} </Box>
                <Box align={'left'} fontSize={14}>Email: {user.email}</Box>
            </div>
        </Box>
    )
}

export default FavoriteUserItem;