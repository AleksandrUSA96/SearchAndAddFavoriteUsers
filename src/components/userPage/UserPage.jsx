import React, {useEffect, useState} from "react";
import {getUsers} from "../../api/api";
import {Box, CircularProgress, Container} from "@material-ui/core";
import Search from "../common/Search";
import FavoriteUsersList from "./FavoriteUsersList";
import UsersGroupList from "./UsersGroupList";
import UserContext from "../../UserContext";

let UserPage = React.memo(() => {
    const [usersGroup, setUsers] = useState([]);
    const [isFetching, setToggleFetching] = useState(false);
    console.log(usersGroup);

    useEffect(() => {
        getUsers().then(result => setUsers(() => {
            let arrayUsers = result.results;
            arrayUsers.sort((a, b) => {
                const A = a.registered.date.slice(0, 10);
                const B = b.registered.date.slice(0, 10);

                let comparison = 0;
                if (A > B) {
                    comparison = 1;
                } else if (A < B) {
                    comparison = -1;
                }
                return comparison;
            })
            let size = 10;
            let userGroup = [];
            let countGroups = Math.ceil(arrayUsers.length / size);
            for (let i = 0; i < countGroups; i++) {
                userGroup[i] = arrayUsers.slice((i * size), (i * size) + size);
            }
            return userGroup
        }));
        setToggleFetching(true);
    }, [])

    const [testUser, setTestUser] = useState();

    const dragStartHandler = (e, user, index) => {
        console.log('dragStartHandler event: ', e);
        console.log('dragStartHandler user: ', user);
        console.log('dragStartHandler index: ', index);
    }

    const dragEndHandler = (e) => {
        // console.log('dragEndHandler  Event: ', e);
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        // console.log('dragOverHandler event: ', e);
    }

    const dragLeaveHandler = (e) => {
        // console.log('dragLeaveHandler Event: ', e);
    }

    const dragDropHandler = (e, user, index) => {
        e.preventDefault();
        setTestUser(user);
    }

    return (
        <UserContext.Provider value={{
            testUser,
            dragStartHandler,
            dragEndHandler,
            dragOverHandler,
            dragLeaveHandler,
            dragDropHandler
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