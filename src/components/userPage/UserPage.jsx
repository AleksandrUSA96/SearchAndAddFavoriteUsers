import React, {useEffect, useState} from "react";
import {getUsers} from "../../api/api";
import {Box, CircularProgress, Container} from "@material-ui/core";
import Search from "../common/Search";
import FavoriteUsersList from "./FavoriteUsersList";
import UsersGroupList from "./UsersGroupList";
import UserContext from "../../UserContext";

const UserPage = React.memo(() => {
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
    const [testUser2, setTestUser2] = useState();

    const dragStartHandler = (e, objectUserWithGroupId) => {
        if (!e.target.parentElement.contains(e.target)) {
            setTestUser(objectUserWithGroupId);
        }
    }

    const dragEndHandler = (e) => {

    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        console.log('вышел за пределы твоей мамки');

    }

    const dragLeaveHandler = (e) => {
    }

    const dragDropHandler = (e, objectUserWithGroupId) => {
        e.preventDefault();
        let currentObjectGroup = usersGroup.find(group => group.id === objectUserWithGroupId.idGroup);
        let currentIndexUser = currentObjectGroup.group.indexOf(objectUserWithGroupId.user);
        if (currentIndexUser !== -1) {
            currentObjectGroup.group.splice(currentIndexUser, 1);
            setUsers(usersGroup);
            setTestUser2(objectUserWithGroupId.user);
        }
    }
    const dragDropHandler2 = (e) => {
        e.preventDefault();
        setTestUser(null)
        console.log('Stay!');
    }

    return (
        <UserContext.Provider value={{
            testUser,
            testUser2,
            dragStartHandler,
            dragEndHandler,
            dragOverHandler,
            dragLeaveHandler,
            dragDropHandler,
            dragDropHandler2
        }}>
            <>
                {usersGroup.length === 0 ? <CircularProgress/> : null}
                <Container maxWidth="md" spacing={3}>
                    <Search/>
                    <Box display={'flex'}>
                        <UsersGroupList usersGroup={usersGroup}/>
                        <FavoriteUsersList width="50%"/>
                    </Box>
                </Container>
            </>
        </UserContext.Provider>
    )
});

export default UserPage;