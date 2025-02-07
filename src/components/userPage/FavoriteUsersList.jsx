import React, {useContext, useReducer, useState} from 'react';
import {Box} from '@material-ui/core';
import UserContext from '../../UserContext';
import FavoriteUserItem from './FavoriteUserItem';
import {useStyles} from '../common/useStyles';
import {highlightGrey, highlightWhite} from "../common/HighlightEffectForItems";

const reducer = (state, action) => {
    switch (action.type) {
        case 'addUser':
            return [
                ...state,
                action.payload
            ]
        case 'changeUser':
            return action.payload
        default:
            return state
    }
}

const FavoriteUsersList = ({favoriteUser}) => {
    const classes = useStyles();
    const {dragDropHandler} = useContext(UserContext);
    const [currentItem, setCurrentItem] = useState();
    const [state, distpatch] = useReducer(reducer, []);

    const dragStartItemHandler = (item) => {
        setCurrentItem(item);
    }

    const dropSwapUsersInState = (e, dropUser) => {
        if (currentItem) {
            const currentItemIndex = state.indexOf(currentItem);
            const dropUserIndex = state.indexOf(dropUser);
            state.splice(dropUserIndex, 1, currentItem);
            state.splice(currentItemIndex, 1, dropUser);
            distpatch({type: 'changeUser', payload: state});
            highlightWhite(e);
            setCurrentItem(null);
        }
    }

    const dropHandler = (e, favoriteUser) => {
        if (favoriteUser !== null) {
            dragDropHandler(e, favoriteUser)
            distpatch({type: 'addUser', payload: favoriteUser.user});
            highlightWhite(e);
            const favoriteList = document.getElementById('favoriteList');
            favoriteList.style.boxShadow = 'none';
        }
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        highlightGrey(e);
    }

    const dragLeaveHandler = (e) => {
        highlightWhite(e);
    }

    const dragEndHandler = (e) => {
        e.target.style.backgroundColor = '#ffffff';
    }

    return (
        <Box width='50%'>
            {/* Стили применены из Material UI */}
            <Box display={'flex'} alignItems={'center'} border={1}
                 borderColor={'grey.200'}
                 px={2} py={1.4} fontFamily='Roboto, Helvetica, Arial, sans-serif' lineHeight={1.75}>
                Избранные пользователи
            </Box>
            <Box id={'favoriteList'} className={classes.flexDirection} display={'flex'} border={1}
                 borderColor={'grey.200'}
                 p={1}
                 onDragOver={(e) => dragOverHandler(e)}
                 onDragEnd={(e) => dragEndHandler(e)}
                 onDragLeave={(e) => dragLeaveHandler(e)}
                 onDrop={(e) => dropHandler(e, favoriteUser)}
            >
                {state.length !== 0 ?
                    state.map(user => <FavoriteUserItem user={user}
                                                        key={user.login.uuid}
                                                        dragStartItemHandler={dragStartItemHandler}
                                                        dropSwapUsersInState={dropSwapUsersInState}
                    />)
                    : 'Перетащите пользователя, чтобы добавить в избранные'}
            </Box>
        </Box>
    )
}

export default FavoriteUsersList;