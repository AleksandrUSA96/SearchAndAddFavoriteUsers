import React, {useEffect, useState} from "react";
import {getUsers} from "../../api/api";
import {Box, CircularProgress, Container} from "@material-ui/core";
import UsersGroup from "./UsersGroup";
import Search from "../common/Search";
import FavoriteUsersList from "./FavoriteUsersList";
import Provider from "../../UserContext";

let UsersGroupList = React.memo((props) => {
    const [usersGroup, setUsers] = useState([]);
    const [isFetching, setToggleFetching] = useState(false);

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

    return (
        <Provider value={props}>
            <>
                {usersGroup.length === 0 ? <CircularProgress/> : null}
                <Container maxWidth="md" spacing={3}>
                    <Search/>
                    <Box display={'flex'}>
                        <Box width="50%">

                            {
                                usersGroup.map((group, index) => <UsersGroup group={group}
                                                                             key={index}
                                                                             usersGroup={usersGroup.length}
                                />)
                            }
                        </Box>
                        <FavoriteUsersList width="50%"/>
                    </Box>
                </Container>
            </>
        </Provider>
    )
});

export default UsersGroupList;