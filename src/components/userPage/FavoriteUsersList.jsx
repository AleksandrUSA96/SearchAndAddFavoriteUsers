import React, {useContext, useReducer, useState} from "react";
import {Box} from "@material-ui/core";
import UserContext from "../../UserContext";
import FavoriteUserItem from "./FavoriteUserItem";
import {makeStyles} from "@material-ui/styles";
import Style from './FavoriteUserItem.module.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'addUser':
            return [
                ...state,
                action.payload
            ]
        case 'changeUser':
            debugger
            return action.payload
        default:
            return state
    }
}

const useStyles = makeStyles(() => ({
    flexDirection: {
        flexDirection: 'column',
    }
}));

const FavoriteUsersList = ({rer}) => {
    const classes = useStyles();
    const {dragDropHandler} = useContext(UserContext);
    const [currentItem, setCurrentItem] = useState();
    const [state, distpatch] = useReducer(reducer, []);

    const onDragStartItemHandler = (item) => {
        setCurrentItem(item);
    }

    const onDropSwapUsersInState = (dropUser) => {
        console.log('выполняюсь тут как бы вотэээ')

            const currentItemIndex = state.indexOf(currentItem);
            const dropUserIndex = state.indexOf(dropUser);
            state.splice(dropUserIndex, 1, currentItem);
            state.splice(currentItemIndex, 1, dropUser);
            distpatch({type: 'changeUser', payload: state});
            setCurrentItem(null);

    }

    const dropHandler = (e, rer) => {
        console.log('Я выполняюсь')
        debugger
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