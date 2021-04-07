import React, {useEffect, useState} from "react";
import {getUsers} from "../../api/api";
import {Box, CircularProgress, Container} from "@material-ui/core";
import Search from "../common/Search";
import FavoriteUsersList from "./FavoriteUsersList";
import UsersGroupList from "./UsersGroupList";
import UserContext from "../../UserContext";
import {Pagination} from "@material-ui/lab";

let sortedUsers = null;

const UserPage = () => {
    const itemsPerPage = 10;
    const [usersGroup, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [countPages, setCountPages] = useState();
    // const [isFetching, setToggleFetching] = useState(false);

    const handleChangePage = (e, page) => {
        setPage(page);
        setUsers(sortedUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }

    const getUsersGroups = async () => {
        let response = await getUsers();
        let sortedResponse = await sortResponseByGroup(response);
        sortedUsers = await sortedResponse;
        await setCountPages(Math.ceil(sortedResponse.length / itemsPerPage))
        await setUsers(sortedResponse.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }

    const sortResponseByGroup = (response) => {
            let arrayUsers = response;
            arrayUsers.sort((a, b) => {
                const A = a.registered.date.slice(0, 10);
                const B = b.registered.date.slice(0, 10);
                let comparison = 0;
                comparison = A > B ? 1 : -1;
                return comparison;
            });
            const userGroup = [];
            let prevYear;
            arrayUsers.reduce((userGroup, user) => {
                let currentYear = user.registered.date.slice(0, 7)
                if (prevYear !== currentYear) {
                    prevYear = currentYear;
                    userGroup.push({id: currentYear, group: [user]});
                } else {
                    let currentGroup = userGroup.find(group => group.id === currentYear).group;
                    currentGroup.push(user);
                }
                return userGroup;
            }, userGroup);
            return userGroup;
        }

    useEffect(() => {
        getUsersGroups();
    }, []);


    const [testUser, setTestUser] = useState();

    const dragStartHandler = (e, objectUserWithGroupId) => {
        setTestUser(objectUserWithGroupId);
        const favoriteList = document.getElementById('favoriteList');
        e.target.style.transition = "all .3s ease-in-out";
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
        setTestUser(null);
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.opacity = 1;
    }

    const dragDropHandler = (e, objectUserWithGroupId) => {
        e.preventDefault();
        let currentObjectGroup = usersGroup.find(group => group.id === objectUserWithGroupId.idGroup);
        let currentIndexUser = currentObjectGroup.group.indexOf(objectUserWithGroupId.user);
        if (currentIndexUser !== -1) {
            currentObjectGroup.group.splice(currentIndexUser, 1);
            setUsers(usersGroup);
            setTestUser(null);
        }
    }

    const searchUsersHandler = (value) => {
        debugger
        let test = null;
        for (let group of sortedUsers) {
            test = group.filter(user => user.group.name.first.toLowerCase().includes(value.toLowerCase()))
            console.log(test);
        }


        console.log(sortedUsers);
        // sortedUsers.group.name.first.toLowerCase.includes(value.toLowerCase())
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
                    <Search searchUsersHandler={searchUsersHandler} />
                    <Box display={'flex'}>
                        <UsersGroupList usersGroup={usersGroup}/>
                        <FavoriteUsersList width="50%" rer={testUser}/>
                    </Box>
                    <Pagination
                        count={countPages}
                        page={page}
                        defaultPage={1}
                        onChange={handleChangePage}
                        color={'primary'}
                        style={{marginTop: 20 + 'px'}}
                    />
                </Container>
            </>
        </UserContext.Provider>
    )
};

export default UserPage;