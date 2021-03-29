import React from "react";
import {Box} from "@material-ui/core";
import UsersGroup from "./UsersGroup";

let UsersGroupList = ({usersGroup}) => {
    return (
        <>
            <Box width="50%">
                {
                    usersGroup.map((group, index) => <UsersGroup group={group}
                                                                 key={index}
                                                                 index={index}
                    />)
                }
            </Box>
        </>
    )
};

export default UsersGroupList;