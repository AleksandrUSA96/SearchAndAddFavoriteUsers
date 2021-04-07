import React from 'react';
import {Avatar, Box} from '@material-ui/core';
import Style from './FavoriteUserItem.module.css';
import {useStyles} from '../common/useStyles';

const FavoriteUserItem = ({user, onDragStartItemHandler, onDropSwapUsersInState}) => {
    const classes = useStyles();
    return (
        <Box className={[Style.item, classes.favoriteUserItem]} draggable={true} my={1} p={1} border={1}
             borderColor={'grey.200'}
             onDragStart={(e) => onDragStartItemHandler(user)}
             onDrop={(e) => onDropSwapUsersInState(e, user)}
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