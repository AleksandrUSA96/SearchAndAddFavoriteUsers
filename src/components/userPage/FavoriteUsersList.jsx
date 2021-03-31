import React, {useContext, useEffect, useReducer, useState} from "react";
import {Box} from "@material-ui/core";
import UserContext from "../../UserContext";
import FavoriteUserItem from "./FavoriteUserItem";
import {makeStyles} from "@material-ui/styles";

const reducer = (state, action) => {
    switch (action.type) {
        case 'addUser':
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}

const useStyles = makeStyles(() => ({
    flexDirection: {
        flexDirection: 'column',
    }
}));

const FavoriteUsersList = () => {
    const classes = useStyles();
    const {testUser} = useContext(UserContext)
    const {testUser2} = useContext(UserContext)
    const {dragOverHandler, dragDropHandler, dragEndHandler} = useContext(UserContext)
    const [state, distpatch] = useReducer(reducer, [])

    useEffect(() => {
        if (testUser2) distpatch({type: 'addUser', payload: testUser2});
    }, [testUser2])

    return (
        <Box width="50%">
            <Box display={'flex'} alignItems={'center'} border={1}
                 borderColor={'grey.200'}
                 px={2} py={1.4} fontFamily="Roboto, Helvetica, Arial, sans-serif" lineHeight={1.75}>
                Избранные пользователи
            </Box>
            <Box className={classes.flexDirection} display={'flex'} border={1} borderColor={'grey.200'}
                 p={1}
                 onDragOver={(e) => dragOverHandler(e)}
                 onDrop={(e) => dragDropHandler(e, testUser)}
                 onDragEnd={(e) => dragEndHandler(e)}
            >
                {state.length !== 0 ?
                    state.map(user => <FavoriteUserItem user={user}
                                                        key={user.login.uuid}
                    />)
                    : ''}
            </Box>
        </Box>
    )
}

export default FavoriteUsersList;