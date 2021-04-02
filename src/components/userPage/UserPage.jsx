import React, {useEffect, useState} from "react";
import {getUsers} from "../../api/api";
import {Box, CircularProgress, Container} from "@material-ui/core";
import Search from "../common/Search";
import FavoriteUsersList from "./FavoriteUsersList";
import UsersGroupList from "./UsersGroupList";
import UserContext from "../../UserContext";

const UserPage = () => {
    const [usersGroup, setUsers] = useState([]);
    const [isFetching, setToggleFetching] = useState(false);

    useEffect(() => {
        getUsers().then(result => setUsers(() => {
            let arrayUsers = result.results;
            arrayUsers.sort((a, b) => {
                const A = a.registered.date.slice(0, 10);
                const B = b.registered.date.slice(0, 10);
                let comparison = 0;
                comparison = A > B ? 1 : -1;
                return comparison;
            })
            const userGroup = [];
            let prevYear;
            arrayUsers.reduce((userGroup, user) => {
                let currentYear = Number(user.registered.date.slice(0, 4))
                if (prevYear !== currentYear) {
                    prevYear = currentYear;
                    userGroup.push({id: currentYear, group: [user]})
                } else {
                    let currentGroup = userGroup.find(group => group.id === currentYear).group;
                    currentGroup.push(user);
                }
                return userGroup
            }, userGroup)
            return userGroup
        }));
        setToggleFetching(true);
    }, [])

    const [testUser, setTestUser] = useState();

    const dragStartHandler = (e, objectUserWithGroupId) => {
        setTestUser(objectUserWithGroupId);
        const favoriteList = document.getElementById('favoriteList');
        e.target.style.transition = "all .3s ease-in-out"
        e.target.style.backgroundColor = '#eeeeee';
        e.target.style.opacity = .5;
        favoriteList.style.transition = 'all .3s ease-in-out';
        favoriteList.style.boxShadow = 'inset rgb(63 81 181) 0px 0px 10px 0px';
    }

    const dragStartFavoriteUserHandel = (e, user) => {
        setTestUser(user);
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dragEndHandler = (e) => {
        setTestUser(null)
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.opacity = 1;
    }

    const dragDropHandler = (e, objectUserWithGroupId) => {
        debugger
        e.preventDefault();
        let currentObjectGroup = usersGroup.find(group => group.id === objectUserWithGroupId.idGroup);
        let currentIndexUser = currentObjectGroup.group.indexOf(objectUserWithGroupId.user);
        if (currentIndexUser !== -1) {
            currentObjectGroup.group.splice(currentIndexUser, 1);
            setUsers(usersGroup);
            setTestUser(null)
        }
    }

    return (
        <UserContext.Provider value={{
            testUser,
            dragStartHandler,
            dragOverHandler,
            dragDropHandler,
            dragEndHandler,
            dragStartFavoriteUserHandel
        }}>
            <>
                {usersGroup.length === 0 ? <CircularProgress/> : null}
                <Container maxWidth="md" spacing={3}>
                    <Search/>
                    <Box display={'flex'}>
                        <UsersGroupList usersGroup={usersGroup}/>
                        <FavoriteUsersList width="50%" rer={testUser}/>
                    </Box>
                </Container>
            </>
        </UserContext.Provider>
    )
};

export default UserPage;