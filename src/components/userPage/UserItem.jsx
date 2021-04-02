import React, {useContext} from 'react';
import {Avatar, Box} from '@material-ui/core';
import UserContext from "../../UserContext";

const UserItem = ({user, id, idGroup}) => {
    const {
        dragStartHandler,
        dragEndHandler,
        dragOverHandler
    } = useContext(UserContext)

    return (
        <Box dropstyle={{cursor: 'pointer'}} draggable={true} display={'flex'} direction={'row'} alignItems={'center'}
             border={1}
             borderColor={'grey.200'}
             borderRadius={5} my={1} p={1}
             onDragStart={(e) => dragStartHandler(e, {user, id, idGroup})}
             onDragOver={(e) => dragOverHandler(e)}
             onDragEnd={(e) => dragEndHandler(e)}
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

export default UserItem;