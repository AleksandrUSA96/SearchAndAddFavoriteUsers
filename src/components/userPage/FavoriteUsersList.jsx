import React, {useContext, useReducer, useState} from "react";
import {Box} from "@material-ui/core";
import UserContext from "../../UserContext";
import FavoriteUserItem from "./FavoriteUserItem";
import Style from './FavoriteUserItem.module.css';
import {useStyles} from "../common/useStyles";

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

const FavoriteUsersList = ({rer}) => {
    const classes = useStyles();
    const {dragDropHandler} = useContext(UserContext);
    const [currentItem, setCurrentItem] = useState();
    const [state, distpatch] = useReducer(reducer, []);

    const onDragStartItemHandler = (item) => {
        setCurrentItem(item);
    }

    const dropHandler = (e, rer) => {
        if (rer !== null) {
            dragDropHandler(e, rer)
            distpatch({type: 'addUser', payload: rer.user});

            let eTargetParent = e.target.closest('.' + Style.item)
            if (e.target.classList.contains(Style.item)) {
                e.target.style.backgroundColor = '#ffffff';
            }
            if (eTargetParent) eTargetParent.style.backgroundColor = '#ffffff';

            const favoriteList = document.getElementById('favoriteList');
            favoriteList.style.boxShadow = 'none';
        }
    }

    const onDropSwapUsersInState = (e, dropUser) => {
        if (currentItem) {
            const currentItemIndex = state.indexOf(currentItem);
            const dropUserIndex = state.indexOf(dropUser);
            state.splice(dropUserIndex, 1, currentItem);
            state.splice(currentItemIndex, 1, dropUser);
            distpatch({type: 'changeUser', payload: state});
            let eTargetParent = e.target.closest('.' + Style.item)
            e.target.style.backgroundColor = '#ffffff';
            eTargetParent.style.backgroundColor = '#ffffff';
            setCurrentItem(null);
        }
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        let eTargetParent = e.target.closest('.' + Style.item)
        if (e.target.classList.contains(Style.item)) {
            e.target.style.backgroundColor = '#eeeeee';
        }
        if (eTargetParent) eTargetParent.style.backgroundColor = '#eeeeee';
    }

    const dragLeaveHandler = (e) => {
        let eTargetParent = e.target.closest('.' + Style.item)
        if (e.target.classList.contains(Style.item)) {
            e.target.style.backgroundColor = '#ffffff';
        }
        if (eTargetParent) eTargetParent.style.backgroundColor = '#ffffff';
    }

    const dragEndHandler = (e) => {
        e.target.style.backgroundColor = '#ffffff';
    }

    return (
        <Box width="50%">
            <Box display={'flex'} alignItems={'center'} border={1}
                 borderColor={'grey.200'}
                 px={2} py={1.4} fontFamily="Roboto, Helvetica, Arial, sans-serif" lineHeight={1.75}>
                Избранные пользователи
            </Box>
            <Box id={'favoriteList'} className={classes.flexDirection} display={'flex'} border={1}
                 borderColor={'grey.200'}
                 p={1}
                 onDragOver={(e) => dragOverHandler(e)}
                 onDragEnd={(e) => dragEndHandler(e)}
                 onDragLeave={(e) => dragLeaveHandler(e)}
                 onDrop={(e) => dropHandler(e, rer)}
            >
                {state ?
                    state.map(user => <FavoriteUserItem user={user}
                                                        key={user.login.uuid}
                                                        onDragStartItemHandler={onDragStartItemHandler}
                                                        onDropSwapUsersInState={onDropSwapUsersInState}
                    />)
                    : ''}
            </Box>
        </Box>
    )
}

export default FavoriteUsersList;